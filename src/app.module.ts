import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { getMongoConfig } from './configs/mongo.config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', '.env.development', '.env.development.local'],
    }),
    AuthModule,
    MongooseModule.forRootAsync(getMongoConfig()),
    UserModule,
  ],
})
export class AppModule {}
