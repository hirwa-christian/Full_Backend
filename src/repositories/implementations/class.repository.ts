import { IClassRepository } from "../interfaces/class.interface";
import { CreateClassDto } from "../../dtos/class.dto";
import { Class } from "@prisma/client";
import { prismaRead, prismaWrite } from "../../config/prisma";

export class PClassRepository implements IClassRepository {

    async create(data: CreateClassDto): Promise<Class> {
        return await prismaWrite.class.create({data});
    
    }
    async getAll(): Promise<Class[]> {
        return await prismaRead.class.findMany();
    }
}