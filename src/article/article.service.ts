import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto } from './dto/dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  async createArticle(userId: number, data: CreateArticleDto) {
    return this.prisma.articleLink.create({
      data: {
        ...data,
        userId,
      },
    });

  }

  async getArticles(userId: number) {
    return this.prisma.articleLink.findMany({
      where: { userId },
    });
  }

  async updateArticle(id: number, data: CreateArticleDto) {
    const bookmark = await this.prisma.articleLink.findUnique({
      where: { id },
    });
    if (!bookmark) {
      throw new NotFoundException('Bookmark not found');
    }
    return this.prisma.articleLink.update({
      where: { id },
      data: { ...data, updatedAt: new Date() },
    });
  }

  async deleteArticle(id: number) {
    return this.prisma.articleLink.delete({ where: { id } });
  }
}
