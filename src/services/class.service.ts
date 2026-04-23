import { ClassAttributes } from "../interfaces/class.interface";
import { PClassRepository } from "../repositories/implementations/class.repository";
import { Class } from "@prisma/client";

export class ClassService {
  private classRepository: PClassRepository;
  constructor() {
    this.classRepository = new PClassRepository();
  }

  async createClass(data: ClassAttributes): Promise<Class> {
    const newClass = await this.classRepository.create(data);
    return newClass;
  }

  async getAllClasses(): Promise<Class[]> {
    return await this.classRepository.getAll();
  }
}
