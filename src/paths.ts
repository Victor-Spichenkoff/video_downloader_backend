import path from "path";

export const isWindows = process.platform === "win32";
export const tmpDir = "/tmp"; // Diretório temporário para a Vercel
export const downloadsDir = isWindows ? path.join(__dirname, "../tmp") : tmpDir;


export const ytDlpPath = isWindows ? path.join(__dirname, "../tmp/yt-dlp.exe") : "/tmp/yt-dlp";
export const ffmpegPath = isWindows ? path.join(__dirname, "../tmp/ffmpeg.exe") : "/tmp/ffmpeg";