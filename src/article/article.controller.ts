import { Controller, Param, Post, Get, Body, Put, Delete } from '@nestjs/common';
import { ArticleService } from './article.service';
import { CreateArticleDto } from './dto/article.dto';

@Controller('article')
export class ArticleController {
  constructor(private readonly articleService: ArticleService) {}
 
  @Post('create/:userId')
  async createArticle(
    @Param('userId') userId: string,
    @Body() createArticleDto: CreateArticleDto,
  ) {
    return this.articleService.createArticle(+userId, createArticleDto);
  }

  @Get('/:userId')
  async getArticles(@Param('userId') userId: string) {
    return this.articleService.getArticles(+userId);
  }

  @Put('update/:id')
  async updatearticle(
    @Param('id') id: string,
    @Body() updateArticleDto: CreateArticleDto,
  ) {
    return this.articleService.updateArticle(+id, updateArticleDto);
  }

  @Delete('delete/:id')
  async deleteArticle(@Param('id') id: string) {
    return this.articleService.deleteArticle(+id);
  }
}
