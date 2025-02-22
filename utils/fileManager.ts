import path from "path"
import * as fs from 'fs/promises'
import { downloadsDir, ffmpegOriginalPath, ffmpegPath, isDev, ytDlpOriginalPath, ytDlpPath } from "../src/paths"
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
        console.log("Copying YT_DLP to: " + ytDlpPath)
        
        return
        fs_default.copyFileSync(ytDlpOriginalPath, ytDlpPath)
        fs_default.chmodSync(ytDlpPath, 0o755) // Permissão de execução
    }
    
    if (!fs_default.existsSync(ffmpegPath)) {
        console.log("Copying FFMPEG to: " + ffmpegPath)
        fs_default.copyFileSync(ffmpegOriginalPath, ffmpegPath)
        fs_default.chmodSync(ffmpegPath, 0o755) // Permissão de execução
    }
}