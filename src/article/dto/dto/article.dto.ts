import { IsString, IsOptional, IsDate } from 'class-validator';

export class CreateArticleDto {
  @IsString()
  readonly header: string;

  @IsString()
  readonly link: string;

  @IsOptional()
  @IsDate()
  readonly createdAt?: Date;

  @IsOptional()
  @IsDate()
  readonly updatedAt?: Date;
}
