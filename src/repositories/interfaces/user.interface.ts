import { User } from "@prisma/client";
import { CreateUserDto } from "../../dtos/user.dto";

export interface IUserRepository {
  create(data: CreateUserDto): Promise<User>;
}
