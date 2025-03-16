import { HabitCategory } from '@domenica/common/types';
import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


@Schema({timestamps: true})
export class Habit extends Document {
    @Prop({required: true})
    title: string;

    @Prop({required: true, ref: 'User'})
    userId: string;

    @Prop({type: String, enum: ['mind', 'body', 'social', 'financial']})
    category: HabitCategory;

    @Prop({ default: 1})
    streak: number;

    @Prop({required: true})
    recurrence: string;
}

export const HabitSchema = SchemaFactory.createForClass(Habit);
