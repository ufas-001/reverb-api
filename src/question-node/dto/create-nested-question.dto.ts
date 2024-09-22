import { IsNotEmpty, IsString, IsArray } from 'class-validator';

export class CreateNestedQuestionDto {
  @IsNotEmpty()
  @IsString()
  parentOptionId: string;

  @IsNotEmpty()
  @IsString()
  text: string;

  @IsArray()
  options: string[];

  @IsNotEmpty()
  @IsString()
  apiKey: string; // Add this line to include apiKey
}
