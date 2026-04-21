import { StudentsAttributes } from "../interfaces/student.interface";
import { PStudentRepository } from "../repositories/implementations/students.repository";
import { Member } from "@prisma/client";
import { NotFoundError } from "../utils/http-error";
import { logger } from "../utils/logger";

export class StudentService {
  private readonly studentRepository: PStudentRepository;
  constructor() {
    this.studentRepository = new PStudentRepository();
  }
  async createStudent(data: StudentsAttributes): Promise<Member> {
    const newMember = await this.studentRepository.create(data);
    return newMember;
  }
  async getStudentById(studentId: bigint): Promise<Member | NotFoundError> {
    const member = await this.studentRepository.getStudentById(studentId);
    if (!member) {
      logger.error("Student not found");
      throw new NotFoundError("Student not found");
    }
    return member;
  }
}
