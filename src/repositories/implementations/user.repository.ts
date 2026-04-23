import { IUserRepository } from "../interfaces/user.interface";
import { CreateUserDto } from "../../dtos/user.dto";
import { UserAttributes } from "../../interfaces/user.interface";
import { User } from "@prisma/client";
import { prismaRead, prismaWrite } from "../../config/prisma";
export class PUserRepository implements IUserRepository {
  async create(data: CreateUserDto): Promise<User> {
    return await prismaWrite.user.create({data});
  }

  async findByEmail(email: string) {
    return await prismaRead.user.findUnique({
      where: {
        email,
      },
    });
  }
}
