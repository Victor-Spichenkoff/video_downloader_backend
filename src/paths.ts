import { configDotenv } from "dotenv"
import path from "path"
configDotenv()

export const isDev = process.env.ENVIROMENT == "dev"

export const isWindows = process.platform === "win32"

// local vs online
const devDownloadsDir = path.join(__dirname, "..", "downloads")
const prodDownloadsDir = path.join(__dirname, "../tmp")

const devYtDlpPath = path.join(__dirname, "bin",
    `${isWindows ? "yt-dlp.exe" : "yt-dlp"}`)
const prodYtDlPath = isWindows ?
    path.join(__dirname, "../tmp/yt-dlp.exe") :
    path.join(__dirname, "../tmp/yt-dlp")

const devFfmpeg = isWindows ? path.join(__dirname, "bin/ffmpeg.exe") : "bin/ffmpeg"
const prodFfmpeg = isWindows ? path.join(__dirname, "../tmp/ffmpeg.exe") : "/tmp/ffmpeg"

// reais
export const downloadsDir = isDev ? devDownloadsDir : prodDownloadsDir
export const ytDlpPath = isDev ? devYtDlpPath : prodYtDlPath
export const ffmpegPath = isDev ? devFfmpeg : prodFfmpeg

console.log("Downlaod: " + downloadsDir)
console.log("YT_DPL: " + ytDlpPath)
console.log("FFmPEG: " + ffmpegPath)

// para copiar em prod
export const ytDlpOriginalPath = isWindows ? path.join("./bin/yt-dlp.exe") : "./bin/yt-dlp"
export const ffmpegOriginalPath = isWindows ? path.join("./bin/ffmpeg.exe") : "./bin/ffmpeg"

console.log("Temp YT_DPL " + ytDlpOriginalPath)
console.log("Temp FFmPEG " + ffmpegOriginalPath)