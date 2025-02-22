import { deleteFileIfAlreadyExists } from "../utils/fileManager";

const express = require("express");
const cors = require("cors");
const { exec } = require("child_process");
const path = require("path");
const fs = require("fs-extra");

const app = express();
const PORT = 5000;

app.use(cors({
    origin: [
        "htp://localhost:3000",
        "[SITE AQUI]"
    ]
}));
app.use(express.json());

const isWindows = process.platform === "win32";
const tmpDir = "/tmp"; // Diretório temporário para a Vercel
const downloadsDir = isWindows ? path.join(__dirname, "../tmp") : tmpDir;

// Definição dos caminhos para yt-dlp e ffmpeg
const ytDlpPath = isWindows ? path.join(__dirname, "../tmp/yt-dlp.exe") : "/tmp/yt-dlp";
const ffmpegPath = isWindows ? path.join(__dirname, "../tmp/ffmpeg.exe") : "/tmp/ffmpeg";

// Criar diretório de downloads localmente
fs.ensureDirSync(downloadsDir);

// Middleware de teste
app.get("/", (req: any, res: any) => res.send("Funcionando"));
app.get("/teste", (req:any, res: any) => res.send("Funcionando"));


// Função para instalar yt-dlp na Vercel (caso não exista)
// async function ensureYtDlpExists() {
//     if (!fs.existsSync(ytDlpPath)) {
//         console.log("yt-dlp não encontrado! Instalando...");
//         await new Promise((resolve, reject) => {
//             exec("pip install yt-dlp --no-cache-dir -t /tmp/", (error: any, stdout: any, stderr: any) => {
//                 if (error) {
//                     console.error(`Erro ao instalar yt-dlp: ${stderr}`);
//                     reject(error);
//                 } else {
//                     console.log("yt-dlp instalado:", stdout);
//                     resolve(stdout);
//                 }
//             });
//         });
//     }
// }

// Rota para download de áudio
app.post("/download", async (req: any, res: any) => {
    const { videoUrl, title = "audio" } = req.body;
    if (!videoUrl) {
        return res.status(400).json({ error: "O campo 'videoUrl' é obrigatório." });
    }

    const tempPath = path.join(downloadsDir, `${title}.mp3`);
    await deleteFileIfAlreadyExists(title);

    // Garantir que yt-dlp esteja disponível
    // await ensureYtDlpExists();

    const command = `"${ytDlpPath}" -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "${tempPath}" "${videoUrl}"`;

    console.log("Executando:", command);

    exec(command, (error:any, stdout: any, stderr: any) => {
        if (error) {
            console.error("Erro ao baixar:", stderr);
            return res.status(500).json({ error: "Falha ao baixar o áudio." });
        }

        // Configuração dos headers para envio do arquivo
        res.setHeader("Content-Type", "audio/mpeg");
        res.setHeader("Content-Disposition", `attachment; filename="${title}.mp3"`);

        const fileStream = fs.createReadStream(tempPath);
        fileStream.pipe(res);
    });
});

// aqui não muda
// Servir arquivos de áudio (localmente)
app.use("/downloads", express.static(downloadsDir));



const port = process.env.PORT ?? 2006

app.listen(port, () => console.log(`Runnig on: http://localhost:${port}`))
export default app




// original:
// const binPath = path.join(__dirname, "../bin");
// const ytDlpPath = path.join(binPath, process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp");
// const ffmpegPath = path.join(binPath, process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg");
// const downloadsDir = path.join(__dirname, "../downloads")

// app.get("/", (req:any, res: any) => res.send("Funcionando"))
// app.get("/teste", (req:any, res: any) => res.send("Funcionando"))


// fs.ensureDirSync(downloadsDir)

// app.post("/download", async (req: any, res: any) => {
//     const { videoUrl, title = "audio" } = req.body;

//     if (!videoUrl) {
//         return res.status(400).json({ error: "O campo 'videoUrl' é obrigatório." });
//     }

//     await deleteFileIfAlreadyExists(title)

//     const outputPath = path.join(downloadsDir, `${title}.mp3`).replace(/\\/g, "/");

//     const command = `"${ytDlpPath}" -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "${outputPath}" "${videoUrl}"`;

//     console.log("Executando:", command);

//     exec(command, (error: any, stdout: any, stderr: any) => {
//         if (error) {
//             console.error("Erro ao baixar:", stderr);
//             return res.status(500).json({ error: "Falha ao baixar o áudio." });
//         }


//         // enviar na dorma correta 
//         res.setHeader("Content-Type", "audio/mpeg");
//         res.setHeader("Content-Disposition", `attachment; filename="${title || "audio"}.mp3"`);
//         const filePath = path.join("downloads", `${title}.mp3`)

//         const fileStream = fs.createReadStream(filePath);
//         fileStream.pipe(res);

//         //antigo, diretão, não precisa mudar no frontend
//         // res.json({ message: "Download completo!", path: `/downloads/${title}.mp3` });
//     });
// });