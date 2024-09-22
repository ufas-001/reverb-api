import { Module } from '@nestjs/common';
import { QuestionNodeController } from './question-node.controller';
import { QuestionNodeService } from './question-node.service';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuestionNodeController],
  providers: [QuestionNodeService, PrismaService]
})
export class QuestionNodeModule {}
