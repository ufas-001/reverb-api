import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { CreateArticleDto } from './dto/dto/article.dto';

@Injectable()
export class ArticleService {
  constructor(private prisma: PrismaService) {}
  async createArticle(apiKey: string, data: CreateArticleDto) {
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
      include: { user: true },
    });

    if (!apiKeyRecord) {
      throw new NotFoundException('API key not found');
    }

    return this.prisma.articleLink.create({
      data: {
        ...data,
        apiKey,
        userId: apiKeyRecord.userId,
      },
    });
  }

  async getArticles(apiKey: string) {
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!apiKeyRecord) {
      throw new NotFoundException('API key not found');
    }

    return this.prisma.articleLink.findMany({
      where: { apiKey },
    });
  }

  async updateArticle(id: number, apiKey: string, data: CreateArticleDto) {
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!apiKeyRecord) {
      throw new NotFoundException('API key not found');
    }

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

  async deleteArticle(id: number, apiKey: string) {
    const apiKeyRecord = await this.prisma.apiKey.findUnique({
      where: { key: apiKey },
    });

    if (!apiKeyRecord) {
      throw new NotFoundException('API key not found');
    }

    return this.prisma.articleLink.delete({ where: { id } });
  }
}
