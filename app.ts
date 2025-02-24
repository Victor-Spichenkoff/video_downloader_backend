import { configDotenv } from "dotenv"
import { downloadsDir } from "./src/paths"
import { router } from "./src/routes"
import { CheckEnvAndCopy, InstallLinuxFiles, not_binExists } from "./utils/fileManager"
const express = require("express")
const cors = require("cors")
configDotenv()
not_binExists()

CheckEnvAndCopy()//só para windows, copia os meus
// InstallLinuxFiles()
const app = express()

app.use(cors({
    origin: [
        "http://localhost:3000",
        "[SITE AQUI]"
    ],
    methods: ["GET", "POST"],
    allowedHeaders: ["Content-Type", "Content-Disposition"],
    credentials: true
}))
app.use(express.json())

app.use(router)

// aqui não muda
// Servir arquivos de áudio (localmente)
app.use("/downloads", express.static(downloadsDir))


// Função para instalar yt-dlp na Vercel (caso não exista)
// async function ensureYtDlpExists() {
//     if (!fs.existsSync(ytDlpPath)) {
//         console.log("yt-dlp não encontrado! Instalando...")
//         await new Promise((resolve, reject) => {
//             exec("pip install yt-dlp --no-cache-dir -t /tmp/", (error: any, stdout: any, stderr: any) => {
//                 if (error) {
//                     console.error(`Erro ao instalar yt-dlp: ${stderr}`)
//                     reject(error)
//                 } else {
//                     console.log("yt-dlp instalado:", stdout)
//                     resolve(stdout)
//                 }
//             })
//         })
//     }
// }


const port = process.env.PORT ?? 2009

app.listen(port, () => console.log(`Runnig on: http://localhost:${port}`))
export default app


/*
// original:
// const binPath = path.join(__dirname, "../bin")
// const ytDlpPath = path.join(binPath, process.platform === "win32" ? "yt-dlp.exe" : "yt-dlp")
// const ffmpegPath = path.join(binPath, process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg")
// const downloadsDir = path.join(__dirname, "../downloads")

// app.get("/", (req:any, res: any) => res.send("Funcionando"))
// app.get("/teste", (req:any, res: any) => res.send("Funcionando"))


// fs.ensureDirSync(downloadsDir)

// app.post("/download", async (req: any, res: any) => {
//     const { videoUrl, title = "audio" } = req.body

//     if (!videoUrl) {
//         return res.status(400).json({ error: "O campo 'videoUrl' é obrigatório." })
//     }

//     await deleteFileIfAlreadyExists(title)

//     const outputPath = path.join(downloadsDir, `${title}.mp3`).replace(/\\/g, "/")

//     const command = `"${ytDlpPath}" -x --audio-format mp3 --ffmpeg-location "${ffmpegPath}" -o "${outputPath}" "${videoUrl}"`

//     console.log("Executando:", command)

//     exec(command, (error: any, stdout: any, stderr: any) => {
//         if (error) {
//             console.error("Erro ao baixar:", stderr)
//             return res.status(500).json({ error: "Falha ao baixar o áudio." })
//         }


//         // enviar na dorma correta
//         res.setHeader("Content-Type", "audio/mpeg")
//         res.setHeader("Content-Disposition", `attachment filename="${title || "audio"}.mp3"`)
//         const filePath = path.join("downloads", `${title}.mp3`)

//         const fileStream = fs.createReadStream(filePath)
//         fileStream.pipe(res);

//         //antigo, diretão, não precisa mudar no frontend
//         // res.json({ message: "Download completo!", path: `/downloads/${title}.mp3` });
//     });
// });
// final do original */