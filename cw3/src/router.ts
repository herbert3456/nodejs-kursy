import { Router,type Request,type Response } from "express";
import fs from 'fs/promises';

const router = Router();

router.get('/', (req: Request, res:Response) => {
    res.status(200).json({ message: "Hello World!" });
});
router.get('/info', (req: Request, res:Response) => {
    res.status(200).json({ message: "Info about the application." });
});
router.get('/index', async (req: Request, res:Response) => {
    const context = await fs.readFile("./public/index.html", "utf-8");
    res.status(200).send(context);
});
export default router;