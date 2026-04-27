import { FastifyReply, FastifyRequest } from "fastify";
import { CreateUserDto } from "../dtos/user.dto";
import { User } from "@prisma/client";
import { UserService } from "../services/user.service";
import { ResponseHandler } from "../utils/response";
import { logger } from "../utils/logger";
import { use } from "i18next";
import { UserAttributes } from "../interfaces/user.interface";

export class UserController {
  private readonly userService: UserService;

  constructor(userService: UserService) {
    this.userService = userService;
  }

  async create(request: FastifyRequest, reply: FastifyReply): Promise<User> {
    const dto = request.body as UserAttributes;
    const user = await this.userService.createUser(dto);
    // logger.info("user created successfully with id:" + user.id.toString());
    return ResponseHandler.success(reply, 200, "User Created successfully", user);
  }

  async login(request: FastifyRequest, reply: FastifyReply): Promise<void> {
    const { email, password } = request.body as { email: string; password: string };
    const user = await this.userService.loginUser(email, password);
    if (!user) {
      ResponseHandler.error(reply, 401, "Invalid email or password");
    }
    ResponseHandler.success(reply, 200, "Authentication Successful", user);
  }
}
