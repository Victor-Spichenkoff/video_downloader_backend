import path from "path"
import * as fs from 'fs/promises'
import { destinyPath, downloadsDir, ffmpegOriginalPath, ffmpegPath, isDev, removeExtraSrc, ytDlpOriginalPath, ytDlpPath } from "../src/paths"
import * as fs_default from "fs"



/**
 * Sem o .mp3
*/
export async function deleteFileIfAlreadyExists(fileName: string) {
    const pathToFile = path.join(downloadsDir + `\\${fileName}.mp3`)//`/tmp/${fileName}.mp3`

    console.log(pathToFile)

    try {
        // Verifica se o arquivo existe
        await fs.access(pathToFile)

        // Se o arquivo existe, apaga
        await fs.unlink(pathToFile)
        console.log(`Arquivo ${pathToFile} apagado com sucesso.`)
    } catch (erro: any) {
        // Se o arquivo não existe, ignora o erro
        if (erro.code === 'ENOENT') {
            console.log(`Arquivo ${pathToFile} não existe.`)
        } else {
            // Outros erros
            console.error(`Erro ao apagar arquivo ${pathToFile}:`, erro)
        }
    }
}


export const CheckEnvAndCopy = () =>
{
    if(isDev) return console.log("[DEV] Não copiar")

    if (!fs_default.existsSync(ytDlpPath)) {
        console.log("Copying YT_DLP to: " + destinyPath)
        fs_default.copyFileSync(ytDlpOriginalPath, destinyPath)
        // console.log("Copying YT_DLP to: " + ytDlpPath)
        // fs_default.copyFileSync(ytDlpOriginalPath, ytDlpPath)
        fs_default.chmodSync(ytDlpPath, 0o755) // Permissão de execução
    }
    
    if (!fs_default.existsSync(ffmpegPath)) {
        console.log("Copying FFMPEG to: " + destinyPath)
        fs_default.copyFileSync(ffmpegOriginalPath, destinyPath)
        // console.log("Copying FFMPEG to: " + ffmpegPath)
        // fs_default.copyFileSync(ffmpegOriginalPath, ffmpegPath)
        fs_default.chmodSync(ffmpegPath, 0o755) // Permissão de execução
    }
}




export const not_binExists = () => {
    const not_binPath = removeExtraSrc(path.join(__dirname, "..", "src", "not_bin"))
console.log("📂 Verificando not_binários em: " + not_binPath);

if (!fs_default.existsSync(not_binPath)) {
    console.error("🚨 ERRO: Pasta 'not_bin' não existe!");
} else {
    console.log("✅ Pasta 'not_bin' encontrada.");
    
    const files = fs_default.readdirSync(not_binPath);
    if (files.length === 0) {
        console.error("🚨 ERRO: Pasta 'not_bin' está vazia!");
    } else {
        console.log("📄 Arquivos na pasta 'not_bin':", files);
    }
}
}