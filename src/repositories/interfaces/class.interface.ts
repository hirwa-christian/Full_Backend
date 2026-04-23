import { Class } from "@prisma/client";
import { CreateClassDto } from "../../dtos/class.dto";

export interface IClassRepository {
  create(data: CreateClassDto): Promise<Class>;
}
