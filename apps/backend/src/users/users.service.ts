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

    async findByEmail(email: string): Promise<User | null>{
        return this.userModel.findOne({ email }).exec();
    }

    async updateUserGuild(userId: string, guildId: string): Promise<User | null> {
        return this.userModel.findByIdAndUpdate(userId, { guildId }, { new: true }).exec();
    }

    async create(userData: Partial<User>): Promise<User>{
        try {
            const newUser = new this.userModel(userData);
            return await newUser.save();   
        } catch (error) {
            console.log({error})
            throw error;
        }
    }
}