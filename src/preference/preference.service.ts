import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { UserPreferences } from '@prisma/client';
import { CreatePreferencesDto } from './dto/preference.dto';
import { UpdatePreferencesDto } from './dto/updatePreference.dto';

@Injectable()
export class PreferenceService {
  constructor(private prisma: PrismaService) {}

  async getPreferencesByApiKey(
    apiKey: string,
  ): Promise<UserPreferences | null> {
    return this.prisma.userPreferences.findUnique({
      where: { apiKey },
    });
  }

  async upsertPreferencesByApiKey(
    apiKey: string,
    data: CreatePreferencesDto | UpdatePreferencesDto,
  ): Promise<UserPreferences> {
    const existingPreferences = await this.prisma.userPreferences.findUnique({
      where: { apiKey },
    });

    if (existingPreferences) {
      // Update existing preferences
      return this.prisma.userPreferences.update({
        where: { apiKey },
        data,
      });
    } else {
      // Ensure CreatePreferencesDto properties are present for creation
      const createData = data as CreatePreferencesDto;

      const apiKeyRelation = await this.prisma.apiKey.findUnique({
        where: { key: apiKey },
        select: { userId: true },
      });

      if (!apiKeyRelation) {
        throw new NotFoundException('API key not found');
      }

      return this.prisma.userPreferences.create({
        data: {
          ...createData,
          apiKey,
          userId: apiKeyRelation.userId,
        },
      });
    }
  }
}
