import {
  Controller,
  Get,
  Post,
  Body,
  Param
} from '@nestjs/common';
import { QuestionNodeService } from './question-node.service';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateNestedQuestionDto } from './dto/create-nested-question.dto'

@Controller('question-node')
export class QuestionNodeController {
  constructor(private readonly questionsService: QuestionNodeService) {}

  @Post('create')
  async createQuestion(@Body() createQuestionDto: CreateQuestionDto) {
    return this.questionsService.createQuestion(createQuestionDto);
  }

  // Endpoint to create a nested question for an option
  @Post('create-nested')
  async createNestedQuestion(
    @Body() createNestedQuestionDto: CreateNestedQuestionDto,
  ) {
    return this.questionsService.createNestedQuestion(createNestedQuestionDto);
  }

  // Endpoint to fetch the question tree for an apiKey
  @Get('tree/:apiKey')
  async getQuestionTree(@Param('apiKey') apiKey: string) {
    return this.questionsService.getQuestionTree(apiKey);
  }
}
