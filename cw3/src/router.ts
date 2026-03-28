import { Router,type Request,type Response } from "express";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { FileRepo } from "./FileRepo.js";
const router = Router();
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const pathToPublic = path.join(__dirname,'..', 'public');
console.log(__dirname);

router.get('/', (req: Request, res:Response) => {
    res.status(200).json({ message: "Hello World!" });
});
router.get('/info', (req: Request, res:Response) => {
    res.status(200).json({ message: "Info about the application." });
});
router.get('/index', async (req: Request, res:Response) => {
    const context = await fs.readFile(pathToPublic + '/index.html', "utf-8");
    res.status(200).send(context);
});
router.get('/api/students', async (req: Request, res:Response) => {
    const fileRepo = new FileRepo('students.json');
    console.log(fileRepo.getfile());

    const students = await fs.readFile(fileRepo.getfile(), "utf-8");
    res.status(200).json(JSON.parse(students));
});
export default router;