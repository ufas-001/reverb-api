import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateUserDto } from './dto/dto/user.dto';
import { hash } from 'bcrypt';
import { ApiKeyService } from './api-key.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private apiKeyService: ApiKeyService,
  ) {}

  async create(dto: CreateUserDto) {
    const user = await this.prisma.user.findUnique({
      where: {
        email: dto.email,
      },
    });
    if (user) throw new ConflictException('email duplicated');
    const newUser = await this.prisma.user.create({
      data: {
        ...dto,
        password: await hash(dto.password, 10),
      },
    });
    const { password, ...result } = newUser;
    return result;
  }

  async findByEmail(email: string) {
    return await this.prisma.user.findUnique({
      where: {
        email: email,
      },
    });
  }

  async findById(id: number) {
    return await this.prisma.user.findUnique({
      where: {
        id: id,
      },
      include: {
        apiKey: true,
      },
    });
  }

  async generateApiKey(userId: number): Promise<string> {
    return await this.apiKeyService.generateApiKey(userId);
  }

  async getApiKey(apiKey: string) {
    return await this.apiKeyService.getApiKey(apiKey);
  }

  async validateApiKey(apiKey: string) {
    return await this.apiKeyService.validateApiKey(apiKey);
  }
}
