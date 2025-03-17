import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { GuildModule } from './guild/guild.module';
import { UserModule } from './users/users.module';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://127.0.0.1:27017/winter', {
      connectionFactory: (connection) => {
        connection.on('error', (error) => {
          console.error('MongoDB connection error:', error);
        });
        connection.once('open', () => {
          console.log('MongoDB connected successfully');
        });
        return connection;
      },
    }),
    AuthModule,
    GuildModule,
    UserModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
