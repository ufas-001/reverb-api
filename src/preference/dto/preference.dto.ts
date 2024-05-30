import { IsString } from 'class-validator';

export class CreatePreferencesDto {
  @IsString()
  backgroundColor: string;

  @IsString()
  textColor: string;

  @IsString()
  bannerColor: string;
}
