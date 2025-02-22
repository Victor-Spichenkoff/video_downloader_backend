import { Router } from "express";
import path from "path";
import { deleteFileIfAlreadyExists } from "../utils/fileManager";
import { downloadsDir, ffmpegPath, ytDlpPath } from "./paths";
const { exec } = require("child_process");

const fs = require("fs-extra");

const router = Router()


fs.ensureDirSync(downloadsDir);


router.post("/download", async (req: any, res: any) => {
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
})


// Middleware de teste
router.get("/", (req: any, res: any) => res.send("Funcionando"));
router.get("/teste", (req: any, res: any) => res.send("Funcionando"));



export { router }