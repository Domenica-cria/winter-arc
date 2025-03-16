import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GuildModule } from './guild/guild.module';
@Module({
  imports: [AuthModule, GuildModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
