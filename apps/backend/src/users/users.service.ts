import { Injectable } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User } from "./schemas/user.schema";

@Injectable()
export class UserService{
    constructor(@InjectModel(User.name) private userModel: Model<User>){};

    async findById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).exec();
    }

    async updateUserGuild(userId: string, guildId: string): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(userId, { guildId }, { new: true }).exec();
    }
}