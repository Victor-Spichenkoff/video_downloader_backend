import path from "path";
import * as fs from 'fs/promises';


/**
 * Sem o .mp3
*/
export async function deleteFileIfAlreadyExists(fileName: string) {
    const pathToFile = `/tmp/${fileName}.mp3`

    try {
        // Verifica se o arquivo existe
        await fs.access(pathToFile);

        // Se o arquivo existe, apaga
        await fs.unlink(pathToFile);
        console.log(`Arquivo ${pathToFile} apagado com sucesso.`);
    } catch (erro: any) {
        // Se o arquivo não existe, ignora o erro
        if (erro.code === 'ENOENT') {
            console.log(`Arquivo ${pathToFile} não existe.`);
        } else {
            // Outros erros
            console.error(`Erro ao apagar arquivo ${pathToFile}:`, erro);
        }
    }
}