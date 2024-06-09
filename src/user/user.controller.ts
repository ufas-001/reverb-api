import { Controller, Get, Param, UseGuards, Post, Req, NotFoundException, ParseIntPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { JwtGuard } from 'src/auth/guards/jwt.guard';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(JwtGuard)
  @Get(':id')
  async getUserProfile(@Param('id') id: number) {
    return await this.userService.findById(id);
  }

  @UseGuards(JwtGuard)
  @Get(':id/apikey')
  async getApiKey(@Param('id', ParseIntPipe) id: number) {
    const user = await this.userService.findById(id);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    if (!user.apiKey) {
      throw new NotFoundException('API key not found');
    }

    return user.apiKey;
  }

  @UseGuards(JwtGuard)
  @Post('api-key')
  async generateApiKey(@Req() req) {
    console.log('Controller received user:', req.user); // Debug statement
    const userId = req.user.sub.id; // Extract userId from the JWT payload
    return await this.userService.generateApiKey(userId);
  }
}
