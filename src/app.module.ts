import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { getMongoConfig } from './config/mongo.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ['.env', '.env.development', '.env.development.local'],
    }),
    AuthModule,
    MongooseModule.forRootAsync(getMongoConfig()),
  ],

  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
