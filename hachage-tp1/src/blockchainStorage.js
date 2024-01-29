import {readFile, writeFile} from 'node:fs/promises'
import {getDate} from "./divers.js";
import {v4 as uuidv4} from 'uuid';

/* Chemin de stockage des blocks */
const path = 'C:/Users/quent/PhpstormProjects/blockchain/hachage-tp1/data/blockchain.json'


/**
 * Mes définitions
 * @typedef { id: string, nom: string, don: number, date: string,hash: string} Block
 * @property {string} id
 * @property {string} nom
 * @property {number} don
 * @property {string} date
 * @property {string} string
 *
 */

/**
 * Renvoie un tableau json de tous les blocks
 * @return {Promise<any>}
 */
export async function findBlocks() {
    try {
        const response = await readFile(path);

        return new Promise((resolve, reject) => {
            if (response.length === 0) {
                resolve([]);
            } else {
                resolve(JSON.parse(response));
            }
        });
    } catch (err) {
        return Promise.reject([]);
    }
}


/**
 * Trouve le dernier block de la chaine
 * @return {Promise<Block|null>}
 */
export async function findLastBlock() {
    const blocks = await findBlocks();
    const lastBlock = (blocks === null || undefined) ? null : blocks[blocks.length - 1];
    return new Promise(resolve => resolve(lastBlock));

}

/**
 * Creation d'un block depuis le contenu json
 * @param contenu
 * @return {Promise<Block[]>}
 */
export async function createBlock(contenu) {
    const obj = {
        id: uuidv4(),
        nom: contenu.nom,
        don: contenu.don,
        date: getDate(),
    }
    try{
        const blockAll = await findBlocks() || [];

        const arr = [blockAll, obj];
        const json = JSON.stringify(arr, null, 2);
        await writeFile(path, json);
        return new Promise(resolve => resolve(arr));
    }catch(err){
        console.log(err);
    }
}


