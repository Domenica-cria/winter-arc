import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { IGuild } from "@domenica/common/types";

@Schema({timestamps: true})
export class Guild implements IGuild {
    @Prop({required: true, unique: true})
    id: "band_of_the_hawk" | "apostles" | "midland_legions" | "berserkers";

    @Prop({required: true})
    name: string;
    
    @Prop({required: true})
    description: string;

    @Prop({required: true})
    bonuses: number;   

    @Prop({type: [String], ref: 'User'})
    members: string[];
}

export const GuildSchema = SchemaFactory.createForClass(Guild);
