import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { IUser } from '@domenica/common/types';

@Schema({ timestamps: true })
export class User implements IUser {
  @Prop()
  _id: string;

  @Prop({ required: true })
  name: string;
  
  @Prop({ required: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ type: String, ref: 'Guild' })
  guildId?: string;

  @Prop({ type: Number, default: 0 })
  level: number;

  @Prop({ type: Number, default: 0 })
  xp: number;

  @Prop({ type: Number, default: 0 })
  streak: number;

  @Prop({ type: Array, default: [] })
  inventory: any[];

  @Prop({ type: Array, default: [] })
  completedChallenges: any[];
}

export const UserSchema = SchemaFactory.createForClass(User);
