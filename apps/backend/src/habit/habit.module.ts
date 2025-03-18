import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { Habit, HabitSchema } from "./schemas/habit.schema";
import { HabitService } from "./habit.service";

@Module({
    imports: [MongooseModule.forFeature([{ name: Habit.name, schema: HabitSchema }])],
    providers: [HabitService],
    exports: [HabitService]
})

export class HabitModule {}