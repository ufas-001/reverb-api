import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch, NotFoundException } from '@nestjs/common';
import { UserPreferences } from '@prisma/client';
import { PreferenceService } from './preference.service';
import { CreatePreferencesDto } from './dto/preference.dto';
import { UpdatePreferencesDto } from './dto/updatePreference.dto';

@Controller('preference')
export class PreferenceController {
  constructor(private userPreferenceService: PreferenceService) {}

  @Get(':apiKey')
  async getPreferences(
    @Param('apiKey') apiKey: string,
  ): Promise<UserPreferences | null> {
    const preferences =
      await this.userPreferenceService.getPreferencesByApiKey(apiKey);
    if (!preferences) {
      throw new NotFoundException(
        'Preferences not found for the given API key',
      );
    }
    return preferences;
  }

  @Patch(':apiKey')
  async upsertPreferences(
    @Param('apiKey') apiKey: string,
    @Body() data: CreatePreferencesDto | UpdatePreferencesDto,
  ): Promise<UserPreferences> {
    return this.userPreferenceService.upsertPreferencesByApiKey(apiKey, data);
  }
}
