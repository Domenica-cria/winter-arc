import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { Habit } from "./schemas/habit.schema";

//DTOs (Data Transfer Objects)
export type CreateHabitDto = Pick<Habit, 'title' | 'category' | 'recurrence'>;

@Injectable()
export class HabitService{
    constructor(@InjectModel(Habit.name) private habitModel: Model<Habit>) {}

    async createHabit(createHabitDto: CreateHabitDto, userId: string, guildId: string){
        const habit = new this.habitModel({
            ...createHabitDto,
            userId,
            guildId
        });

        return habit.save();
    }

    async findAllByUser(userId: string){
        return this.habitModel.find({userId}).exec();
    }

    async logCompletion(habitId: string){
        const habit = await this.habitModel.findById(habitId)

        if(!habit){
            throw new NotFoundException(`The Habit(${habitId}) was not found.`);
        }

        habit.streak += 1;
        return habit.save();
    }
}