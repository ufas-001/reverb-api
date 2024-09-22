import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { CreateQuestionDto } from './dto/create-question.dto';
import { CreateNestedQuestionDto } from './dto/create-nested-question.dto'
import { PrismaService } from 'src/prisma.service';

@Injectable()
export class QuestionNodeService {
  constructor(private prisma: PrismaService) {}
  // Create the first question with options
  async createQuestion(createQuestionDto: CreateQuestionDto) {
    const { text, options, apiKey } = createQuestionDto;

    const apiKeyExists = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!apiKeyExists) {
      throw new NotFoundException('ApiKey not found');
    }

    const question = await this.prisma.question.create({
      data: {
        text,
        apiKey: apiKeyExists.key,
        options: {
          create: options.map((optionText) => ({
            text: optionText,
          })),
        },
      },
      include: { options: true },
    });

    return question;
  }

  async createNestedQuestion(createNestedQuestionDto: CreateNestedQuestionDto) {
    const { parentOptionId, text, options, apiKey } = createNestedQuestionDto;

    const apiKeyExists = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!apiKeyExists) {
      throw new NotFoundException('ApiKey not found');
    }

    // Create the nested question
    const nestedQuestion = await this.prisma.question.create({
      data: {
        text,
        parentOptionId, // Link to the parent option
        apiKey: apiKeyExists.key,
        options: {
          create: options.map((optionText) => ({
            text: optionText,
          })),
        },
      },
      include: { options: true },
    });

    // Link the nested question to the parent option
    await this.prisma.option.update({
      where: { id: parentOptionId },
      data: { nextQuestionId: nestedQuestion.id },
    });

    return nestedQuestion;
  }

  async getQuestionTree(apiKey: string) {
    return this.prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: {
        questions: {
          include: {
            options: {
              include: {
                nextQuestion: {
                  // Include the nextQuestion to get its options
                  include: {
                    options: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
}
