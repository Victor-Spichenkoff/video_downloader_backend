import { deleteFileIfAlreadyExists } from "../utils/fileManager";

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const binPath = path.join(__dirname, "../bin");
const ytDlpPath = path.join(binPath, process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp");
const ffmpegPath = path.join(binPath, process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg");
const downloadsDir = path.join(__dirname, "../downloads")

app.get("/", (req:any, res: any) => res.send("Funcionando"))
app.get("/teste", (req:any, res: any) => res.send("Funcionando"))


fs.ensureDirSync(downloadsDir)

app.post("/download", async (req: any, res: any) => {
    const { videoUrl, title = "audio" } = req.body;

    if (!videoUrl) {
        return res.status(400).json({ error: "O campo 'videoUrl' é obrigatório." });
    }

    await deleteFileIfAlreadyExists(title)

    const outputPath = path.join(downloadsDir, `${title}.mp3`).replace(/\\/g, "/");

    const command = `"${ytDlpPath}" -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "${outputPath}" "${videoUrl}"`;

    console.log("Executando:", command);

    exec(command, (error: any, stdout: any, stderr: any) => {
        if (error) {
            console.error("Erro ao baixar:", stderr);
            return res.status(500).json({ error: "Falha ao baixar o áudio." });
        }


        // enviar na dorma correta 
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Disposition", `attachment; filename="${title || "audio"}.mp3"`);
        const filePath = path.join("downloads", `${title}.mp3`)

        const fileStream = fs.createReadStream(filePath);
        fileStream.pipe(res);

        //antigo, diretão, não precisa mudar no frontend
        // res.json({ message: "Download completo!", path: `/downloads/${title}.mp3` });
    });
});

// Servir os arquivos de áudio baixados
app.use("/downloads", express.static(downloadsDir));


const port = process.env.PORT ?? 2006

app.listen(port, () => console.log(`Runnig on: http://localhost:${port}`))
export default app