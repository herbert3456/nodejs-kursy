import { Router,type Request,type Response } from "express";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
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
    const students = await fs.readFile(path.join(pathToPublic, 'students.json'), "utf-8");
    res.status(200).json(JSON.parse(students));
});
export default router;