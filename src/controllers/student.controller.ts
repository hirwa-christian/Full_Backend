import { FastifyReply, FastifyRequest } from "fastify";
import { CreateStudentDto } from "../dtos/student.dto";
import { StudentService } from "../services/student.service";
import { ResponseHandler } from "../utils/response";
import { logger } from "../utils/logger";

export class StudentController {
  
  private readonly createStudentService: StudentService;

  constructor(createStudentService: StudentService) {
    this.createStudentService = createStudentService;
  }

  async create(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const dto = request.body as CreateStudentDto;
    const student = await this.createStudentService.createStudent(dto);
    logger.info(`Student created successfully with id: ${student.id.toString()}`);
    ResponseHandler.success(reply, 100, "Student created successfully", student, 201);
  }

  async getAll(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const students = await this.createStudentService.getAllStudents();
    logger.info("Students retrieved successfully");
    ResponseHandler.success(reply, 100, "Students retrieved successfully", students);
  }

  async getById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { studentId } = request.params as { studentId: string };
    const student = await this.createStudentService.getStudentById(Number(studentId));
    logger.info("Student retrieved successfully");
    ResponseHandler.success(reply, 100, "Student Found", student);
  }

  async update(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { studentId} = request.params as { studentId: string};
    const dto = request.body as CreateStudentDto;
    const student = await this.createStudentService.updateStudent(Number(studentId), dto);
    logger.info("Student updated successfully");
    ResponseHandler.success(reply, 100, "Student Updated successfully", student);
  }
}
