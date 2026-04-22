import { FastifyReply, FastifyRequest } from "fastify";
import { Class } from "@prisma/client";
import { CreateClassDto } from "../dtos/class.dto";
import { ClassService } from "../services/class.service";
import { ResponseHandler } from "../utils/response";

export class ClassController {
    private readonly classService: ClassService;

    constructor(classService: ClassService) {
        this.classService = classService;
    }

    async create(request: FastifyRequest, reply: FastifyReply): Promise<Class> {
        const dto = request.body as CreateClassDto;
        const newClass = await this.classService.createClass(dto);
        ResponseHandler.success(reply, 100, "Class Created successfully", newClass);
        return newClass;
    }
    
    async getAll(request: FastifyRequest, reply: FastifyReply): Promise<Class[]> {
        const classes = await this.classService.getAllClasses();
        ResponseHandler.success(reply, 100, "Classes retrieved successfully", classes);
        return classes;
    }
}