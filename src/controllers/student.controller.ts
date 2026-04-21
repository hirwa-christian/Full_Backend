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
    logger.info(`Student created successfully with id: ${student.student_id.toString()}`);
    ResponseHandler.success(reply, 100, "Student created successfully", student, 201);
  }
  async getById(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { studentId } = request.params as { studentId: bigint };
    const student = await this.createStudentService.getStudentById(studentId);
    logger.info("Student retrieved successfully");
    ResponseHandler.success(reply, 100, "Student Found", student);
  }
}
