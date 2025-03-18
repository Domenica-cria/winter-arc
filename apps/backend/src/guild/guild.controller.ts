import { Controller, Get, Param, Post, Body } from "@nestjs/common";
import { GuildService } from "./guild.service";

@Controller('guilds')
export class GuildController{
    constructor(private readonly guildService: GuildService){}

    @Get()
    async findAll() {
        return this.guildService.findAll();
    }

    @Get('leaderboard')
    async getLeaderboard() {
        return this.guildService.getLeaderboard();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.guildService.findById(id);
    }

    @Post(':id/join')
    async joinGuild(@Param('id') guildId: string, @Body('userId') userId: string) {
        return this.guildService.joinGuild(guildId, userId);
    }
}



