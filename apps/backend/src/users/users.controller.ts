import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UserService } from './users.service';
import { User } from './schemas/user.schema';
import { CurrentUser } from 'src/auth/decorators/user.decorator';
import { JwtGuard } from 'src/auth/guards/jwt.guard';
import { UseGuards } from '@nestjs/common';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UserService){}

    @UseGuards(JwtGuard)
    @Get('me')
    async getProfile(@CurrentUser() user: {userId: string}): Promise<User | null>{
        return this.userService.findById(user.userId);
    }

}