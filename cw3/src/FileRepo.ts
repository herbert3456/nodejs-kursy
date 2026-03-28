import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToPublic = path.join(__dirname,'..', 'public');
//klasa do obsługi plików JSON
export class FileRepo {
    private pathToFile: string;
    constructor(fileName: string) {
        this.pathToFile = path.join(pathToPublic, fileName);
}
getfile(){
    return this.pathToFile;
} 

}
