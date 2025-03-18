import { ConflictException, Injectable, InternalServerErrorException, NotFoundException, BadRequestException, HttpException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model, Types } from 'mongoose';
import { Guild } from "./schemas/guild.schema";
import { UserService } from "src/users/users.service";
@Injectable()
export class GuildService {
    constructor(
        @InjectModel(Guild.name) private readonly guildModel: Model<Guild>,
        private userService: UserService
    ) { }

    async findAll(): Promise<Guild[]> {
        return this.guildModel.find().exec()
    }

    async findById(id: string): Promise<Guild | null> {
        return this.guildModel.findById(id).exec();
    }

    async getLeaderboard(): Promise<Guild[]> {
        return this.guildModel.find().sort({totalXp: -1}).limit(5).exec()
    }

    async joinGuild(guildId: string, userId: string): Promise<Guild | null> {
        // Input validation
        if (!guildId || !userId) {
            throw new BadRequestException('Guild ID and User ID are required');
        }

        if (!Types.ObjectId.isValid(guildId) || !Types.ObjectId.isValid(userId)) {
            throw new BadRequestException('Invalid Guild ID or User ID format');
        }

        // Check if guild exists
        const guild = await this.guildModel.findById(guildId).exec();
        if (!guild) {
            throw new NotFoundException(`Guild with ID ${guildId} not found`);
        }

        // Check if user exists
        const user = await this.userService.findById(userId);
        if (!user) {
            throw new NotFoundException(`User with ID ${userId} not found`);
        }

        // Rule: User can only join one guild at a time
        if (user.guildId) {
            throw new ConflictException('You already belong to a guild.');
        }

        // Rule: Check if user is already a member of this guild
        if (guild.members.includes(userId)) {
            throw new ConflictException('You are already a member of this guild');
        }

        // Rule: Check guild member limit (assuming a limit of 50 members per guild)
        const MAX_GUILD_MEMBERS = 50;
        if (guild.members.length >= MAX_GUILD_MEMBERS) {
            throw new ConflictException(`Guild has reached the maximum limit of ${MAX_GUILD_MEMBERS} members`);
        }

        try {
            // Update user's guild
            const updatedUser = await this.userService.updateUserGuild(userId, guildId);
            if (!updatedUser) {
                throw new InternalServerErrorException('Failed to update user guild');
            }

            // Update guild's members
            const updatedGuild = await this.guildModel.findByIdAndUpdate(
                guildId,
                { $push: { members: userId } },
                { new: true }
            ).exec();

            if (!updatedGuild) {
                throw new InternalServerErrorException('Failed to update guild members');
            }

            return updatedGuild;
        } catch (error) {
            // Log the error for debugging
            console.error('Error joining guild:', error);
            // Re-throw the error if it's already a NestJS exception
            if (error instanceof HttpException) {
                throw error;
            }

            // Otherwise, wrap it in an InternalServerError
            throw new InternalServerErrorException('Failed to join guild: ' + error.message);
        }
    }

}


