import { Module, forwardRef } from "@nestjs/common";
import { MongooseModule } from "@nestjs/mongoose";
import { GuildController } from "./guild.controller";
import { GuildService } from "./guild.service";
import { Guild, GuildSchema } from "./schemas/guild.schema";
import { UserModule } from "src/users/users.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: Guild.name, schema: GuildSchema }]), 
        forwardRef(() => UserModule)
    ],
    controllers: [GuildController],
    providers: [GuildService],
    exports: [GuildService]
})

export class GuildModule {}
