import { StudentsAttributes } from "../interfaces/student.interface";
import { PStudentRepository } from "../repositories/implementations/students.repository";
import { Student } from "@prisma/client";
import { NotFoundError } from "../utils/http-error";
import { logger } from "../utils/logger";

export class StudentService {
  private readonly studentRepository: PStudentRepository;
  constructor() {
    this.studentRepository = new PStudentRepository();
  }
  async createStudent(data: StudentsAttributes): Promise<Student> {
    const newStudent = await this.studentRepository.create(data);
    return newStudent;
  }

  async getAllStudents(): Promise<Student[]> {
    return await this.studentRepository.getAll();
  }
  
  async getStudentById(studentId: number): Promise<Student | NotFoundError> {
    const student = await this.studentRepository.getStudentById(studentId);
    if (!student) {
      logger.error("Student not found");
      throw new NotFoundError("Student not found");
    }
    return student;
  }

  async updateStudent(studentId: number, data: StudentsAttributes): Promise<Student | NotFoundError> {
    const updateStudent = await this.studentRepository.updateStudent(studentId, data);
    if (!updateStudent) {
      logger.error("Student not found");
      throw new NotFoundError("Student not found");
    }
    return updateStudent;

  }
}
