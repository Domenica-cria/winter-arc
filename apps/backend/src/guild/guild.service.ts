import { ConflictException, Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from 'mongoose';
import { Guild } from "./schemas/guild.schema";
import { UserService } from "src/users/users.service";
@Injectable()
export class GuildService{
    constructor(
        @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
        private userService: UserService
    ) {}

    async findAll(): Promise<Guild[]> {
        return this.guildModel.find().exec()
    }

    async findById(id: string): Promise<Guild | null> {
        return this.guildModel.findById(id).exec();
    }

    async joinGuild(guildId: string, userId: string): Promise<Guild | null>{
        
        // Rule: User can only join one guild at a time
        const user = await this.userService.findById(userId);
        if(user?.guildId){
            throw new ConflictException('You already belong to a guild.')
        }

        // Rule: Check guild member limit

        return this.guildModel.findByIdAndUpdate(
            guildId,
            { $push: { members: userId}},
            {new: true},
        );
    }

}


