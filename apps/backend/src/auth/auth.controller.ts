import { Controller, Post, Body, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { AuthService } from './auth.service';
import { User } from 'src/users/schemas/user.schema';

class LoginDto{
    email: string;
    password: string;
}

class CreateUserDto{
    email: string;
    password: string;
    guildId: string;
    characterClass: string;
}

@Controller('auth')
export class AuthController{
    constructor(private readonly authService: AuthService){}

    @Post('login')
    async login(@Body() createLoginDto: LoginDto){
        const user = await this.authService.validateUser(createLoginDto.email, createLoginDto.password);
        if(!user){
            throw new UnauthorizedException('Invalid credentials');
        }
        return this.authService.login(user);
    }

    @Post('register')
    async register(@Body() createUserDto: CreateUserDto){
        const userAlreadyExists = await this.authService.checkIfUserExists(createUserDto.email);
        if(userAlreadyExists){
            throw new BadRequestException('User already exists');
        }
        return this.authService.register(createUserDto as User);
    }
}
