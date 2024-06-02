import { Controller, Get, Param, ParseIntPipe, Post, Body, Patch } from '@nestjs/common';
import { UserPreferences } from '@prisma/client';
import { PreferenceService } from './preference.service';
import { CreatePreferencesDto } from './dto/preference.dto';
import { UpdatePreferencesDto } from './dto/updatePreference.dto';

@Controller('preference')
export class PreferenceController {
  constructor(private userPreferencesService: PreferenceService) {}
  @Get(':userId')
  async getPreferences(
    @Param('userId', ParseIntPipe) userId: number,
  ): Promise<UserPreferences | null> {
    return this.userPreferencesService.getPreferences(userId);
  }

  @Patch(':userId')
  async upsertPreferences(
    @Param('userId') userId: number,
    @Body() data: CreatePreferencesDto | UpdatePreferencesDto,
  ): Promise<UserPreferences> {
    return this.userPreferencesService.upsertPreferences(userId, data);
  }
}
