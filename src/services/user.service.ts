import { UserAttributes } from "../interfaces/user.interface";
import { PUserRepository } from "../repositories/implementations/user.repository";
import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import { CreateUserDto } from "../dtos/user.dto";

export class UserService {
  private userRepository: PUserRepository;
  constructor() {
    this.userRepository = new PUserRepository();
  }

  async createUser(data: UserAttributes): Promise<User> {
    const saltRounds = 10;
    console.log("Creating user with data:", data);
    const hashedPassword = await bcrypt.hash(data.password, saltRounds);
    console.log("Hashed password:", hashedPassword);
    const newUser = await this.userRepository.create({
      name: data.name,
      email: data.email,
      password: hashedPassword,
      role: data.role ?? "STUDENT",
    });
    console.log("New user created:", newUser);
    return newUser;
  }

  async loginUser(email: string, password: string): Promise<CreateUserDto | null> {
    const user = await this.userRepository.findByEmail(email);
    console.log("User found:", user);
    if (!user) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, user.password);
    console.log("Password match:", isMatch);

    if (!isMatch) {
      return null;
    }
    return user;
  }
}
