import { Body, Controller, Post, Get, UseGuards } from "@nestjs/common";
import { HabitService, CreateHabitDto } from "./habit.service";
import { JwtGuard } from "src/auth/guards/jwt.guard";
import { CurrentUser } from "src/auth/decorators/user.decorator";

@Controller('habits')
@UseGuards(JwtGuard)
export class HabitController {
    constructor(private readonly habitService: HabitService){}

    @Post()
    async create(@Body() createHabitDto: CreateHabitDto, @CurrentUser() user: {userId: string, guildId: string}){
        return this.habitService.createHabit(createHabitDto, user.userId, user.guildId);
    }

    @Get()
    async findAllByUser(@CurrentUser() user: {userId: string}){
        return this.habitService.findAllByUser(user.userId);
    }

    @Post('log')
    async logCompletion(@Body() habitId: string){
        return this.habitService.logCompletion(habitId);
    }
}