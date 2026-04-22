import { IStudentRepository } from "../interfaces/students.interface";
import { CreateStudentDto } from "../../dtos/student.dto";
import { Student } from "@prisma/client";
import { prismaRead, prismaWrite } from "../../config/prisma";

export class PStudentRepository implements IStudentRepository {
  async create(data: CreateStudentDto): Promise<Student> {
    return await prismaWrite.student.create({ data });
  }
  async getStudentById(id: number): Promise<Student | null> {
    return await prismaRead.student.findUnique({ where: { id } });
  }
}
