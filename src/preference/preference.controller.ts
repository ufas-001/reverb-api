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

  @Post(':userId')
  async createPreferences(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: CreatePreferencesDto,
  ): Promise<UserPreferences> {
    return this.userPreferencesService.createPreferences(userId, data);
  }

  @Patch(':userId')
  async updatePreferences(
    @Param('userId', ParseIntPipe) userId: number,
    @Body() data: UpdatePreferencesDto,
  ): Promise<UserPreferences> {
    return this.userPreferencesService.updatePreferences(userId, data);
  }
}
