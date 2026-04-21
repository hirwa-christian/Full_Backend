import { IStudentRepository } from "../interfaces/students.interface";
import { CreateStudentDto } from "../../dtos/student.dto";
import { Member } from "@prisma/client";
import { prismaRead, prismaWrite } from "../../config/prisma";

export class PStudentRepository implements IStudentRepository {
  async create(data: CreateStudentDto): Promise<Member> {
    return await prismaWrite.member.create({ data });
  }
  async getStudentById(student_id: bigint): Promise<Member | null> {
    return await prismaRead.member.findUnique({ where: { student_id } });
  }
}
