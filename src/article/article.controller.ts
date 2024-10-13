import {
  Controller,
  Param,
  Post,
  Get,
  Body,
  Patch,
  Delete,
} from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}

  @Post(':apiKey')
  async createArticle(
    @Param('apiKey') apiKey: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articleService.createArticle(apiKey, createArticleDto);
  }

  @Get(':apiKey')
  async getArticles(@Param('apiKey') apiKey: string) {
    return this.articleService.getArticles(apiKey);
  }

  @Patch(':id/:apiKey')
  async updateArticle(
    @Param('id') id: string,
    @Param('apiKey') apiKey: string,
    @Body() updateArticleDto: CreateArticleDto,
  ) {
    return this.articleService.updateArticle(id, apiKey, updateArticleDto);
  }

  @Delete(':id/:apiKey')
  async deleteArticle(
    @Param('id') id: string,
    @Param('apiKey') apiKey: string,
  ) {
    return this.articleService.deleteArticle(id, apiKey);
  }
}
