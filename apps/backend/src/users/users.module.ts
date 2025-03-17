import { Module } from "@nestjs/common";
import { UserService } from "./users.service";
import { UsersController } from "./users.controller";
import { User, UserSchema } from "./schemas/user.schema";
import { MongooseModule } from "@nestjs/mongoose";
import { GuildModule } from "src/guild/guild.module";

@Module({
    imports: [
        MongooseModule.forFeature([{ name: User.name, schema: UserSchema}]),
        GuildModule
    ],
    controllers: [UsersController],
    providers: [UserService],
    exports: [UserService] // to be used in auth module
})

export class UserModule {}
