import { IsString, IsOptional } from 'class-validator';

export class UpdatePreferencesDto {
  @IsString()
  @IsOptional()
  backgroundColor?: string;

  @IsString()
  @IsOptional()
  textColor?: string;

  @IsString()
  @IsOptional()
  bannerColor?: string;
}
