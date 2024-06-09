import { Body, Controller, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dto/dto/user.dto';
import { UserService } from 'src/user/user.service';
import { LoginDto } from './dto/auth.dto';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private userService: UserService, 
        private authService: AuthService    
    ){}

    @Post("register")
    async registerUser(@Body() dto:CreateUserDto){
        const user = await this.userService.create(dto);
        const apiKey = await this.userService.generateApiKey(user.id);
        return { user, apiKey };
    }

    @Post("login")
    async login(@Body() dto:LoginDto){
        return await this.authService.login(dto)
    }
}
