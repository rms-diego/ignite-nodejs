import { Exception } from "@/Exception";

import bcrypt from "bcrypt";

type RegisterUseCaseDTO = {
  name: string;
  email: string;
  password: string;
};

export class RegisterUseCase {
  private usersRepository: any;

  constructor(usersRepository: any) {
    this.usersRepository = usersRepository;
  }

  async execute({ name, email, password }: RegisterUseCaseDTO) {
    const userAlreadyExists = await this.usersRepository.findByEmail(email);

    if (userAlreadyExists) {
      throw new Exception("User already exists", 409);
    }

    const passwordHash = await bcrypt.hash(password, 6);

    await this.usersRepository.create({ name, email, passwordHash });
  }
}
