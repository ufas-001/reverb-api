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

  async upsertPreferences(
    userId: number,
    data: CreatePreferencesDto | UpdatePreferencesDto,
  ): Promise<UserPreferences> {
    const existingPreferences = await this.prisma.userPreferences.findUnique({
      where: { userId },
    });

    if (existingPreferences) {
      return this.prisma.userPreferences.update({
        where: { userId },
        data,
      });
    } else {
      const createData: CreatePreferencesDto & { userId: number } = {
        userId,
        backgroundColor: (data as CreatePreferencesDto).backgroundColor,
        textColor: (data as CreatePreferencesDto).textColor,
        bannerColor: (data as CreatePreferencesDto).bannerColor,
      };

      return this.prisma.userPreferences.create({
        data: createData,
      });
    }
  }
}
