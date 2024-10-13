import { ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ApiKeyService {
  constructor(private prisma: PrismaService) {}
  async generateApiKey(userId: string): Promise<string> {
    console.log("userId: ", userId); // Debugging statement
    if (!userId) {
      throw new Error('userId is undefined');
    }

    const existingApiKey = await this.prisma.apiKey.findUnique({
      where: { userId }, // Ensure userId is correctly passed here
    });

    if (existingApiKey) {
      return existingApiKey.key; // Return existing API key if found
    }

    const key = uuidv4();
    await this.prisma.apiKey.create({
      data: {
        key,
        userId,
      },
    });

    return key; // Return the new API key
  }

  async getApiKey(apiKey: string) {
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
    });
    if (!apiKeyRecord) {
      throw new NotFoundException('API key not found');
    }
    return apiKeyRecord;
  }

  async validateApiKey(apiKey: string) {
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { user: true }, // Include the user relation
    });

    if (!apiKeyRecord) {
      throw new NotFoundException('Invalid API key');
    }

    return apiKeyRecord.user; // Return the user object
  }
}