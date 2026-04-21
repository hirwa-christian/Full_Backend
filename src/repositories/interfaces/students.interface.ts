import { Member } from "@prisma/client";
import { CreateStudentDto } from "../../dtos/student.dto";

export interface IStudentRepository {
  create(data: CreateStudentDto): Promise<Member>;
}
