import { Module } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GuildController } from "./guild.controller";
import { GuildService } from "./guild.service";
import { Guild, GuildSchema } from "./schemas/guild.schema";

@Module({
    imports: [MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }])],
    controllers: [GuildController],
    providers: [GuildService],
    exports: [GuildService]
})

export class GuildModule {}
