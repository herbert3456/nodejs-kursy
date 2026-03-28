import fs from 'fs/promises';
import path from 'path';
import { fileURLToPath } from 'url';
import type { Student } from './student.js';
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
  getAllStudents = async (): Promise<Student[]> => {
    const data = await fs.readFile(this.pathToFile, "utf-8");
    return JSON.parse(data);
  }
  getStudentById = async (id: number): Promise<Student | null> => {
    //pobranie wszystkich studentów z pliku
    const students = await this.getAllStudents();
    //znalezienie studenta o podanym id lun null jeśli nie istnieje
    return students.find(student => student.id === id) || null;
   
  }
  saveStudents = async (students: Student[]): Promise<void> => {
    const data = JSON.stringify(students, null, 2);
    await fs.writeFile(this.pathToFile, data, "utf-8");

  }  
  addStudent = async (student: Student): Promise<void> => {
    const students = await this.getAllStudents();
    students.push(student);
    await this.saveStudents(students);
  }
  getlastId = async (): Promise<number> => {
    const students = await this.getAllStudents();
    if (students.length === 0) {
        return 0;
    }
    return Math.max(...students.map(student => student.id));
  }
  deleteStudentById = async (id: number): Promise<void> => {
    const students = await this.getAllStudents();
    const filteredStudents = students.filter(student => student.id !== id);
    await this.saveStudents(filteredStudents);
  }
  updateStudent = async (updatedStudent: Student): Promise<void> => {
    const students = await this.getAllStudents();
    const index = students.findIndex(student => student.id === updatedStudent.id);
    if (index !== -1) {
      students[index] = updatedStudent;
      await this.saveStudents(students);
    }
  }
}
