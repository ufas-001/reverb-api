import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserPreferences } from '@prisma/client';
import { CreatePreferencesDto } from './dto/preference.dto';
import { UpdatePreferencesDto } from './dto/updatePreference.dto';

@Injectable()
export class PreferenceService {
  constructor(private prisma: PrismaService) {}

  async getPreferences(userId: number): Promise<UserPreferences | null> {
    return this.prisma.userPreferences.findUnique({
      where: { userId },
    });
  }

  async createPreferences(
    userId: number,
    data: CreatePreferencesDto,
  ): Promise<UserPreferences> {
    return this.prisma.userPreferences.create({
      data: {
        userId,
        ...data,
      },
    });
  }

  async updatePreferences(
    userId: number,
    data: UpdatePreferencesDto,
  ): Promise<UserPreferences> {
    return this.prisma.userPreferences.update({
      where: { userId },
      data,
    });
  }
}
