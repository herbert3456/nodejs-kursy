import { Router,type Request,type Response } from "express";
import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import { FileRepo } from "./FileRepo.js";
import type { Student } from "./student.js";

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
    //wykorzystanie klasy FileRepo do odczytania danych z pliku JSON
    const fileRepo = new FileRepo('students.json');
    //console.log(fileRepo.getfile());

    const students = await fileRepo.getAllStudents();
    console.log(students);
    res.status(200).json(students);
});
router.get('/api/students/:id', async (req: Request, res:Response) => {
    const id = parseInt(req.params.id as string);
    if (isNaN(id)) {
        res.status(404).json({ message: "Invalid student id" });
        return;
    }
    const fileRepo = new FileRepo('students.json');
    const student = await fileRepo.getStudentById(id);
    if (student) {
        res.status(200).json(student);
        
    }else{
        res.status(404).json({ message: "Student not found" });
    }
    
});
router.post('/api/students', async (req: Request, res:Response) => {
    const { firstname, lastname } = req.body;
    const fileRepo = new FileRepo('students.json');
    const id = await fileRepo.getlastId() + 1;
    const newStudent: Student = {
        id,
        firstname,
        lastname,
        date: new Date()
    };
    
    await fileRepo.addStudent(newStudent);
    res.status(201).json(newStudent);
});


export default router;