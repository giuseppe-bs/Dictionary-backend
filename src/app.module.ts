import { Module } from '@nestjs/common';
import { GreetingsController } from './greetings.controller';
import { MongoDBConfigService } from './config/mongodb.config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRootAsync({
      useClass: MongoDBConfigService,
    }),
  ],
  controllers: [GreetingsController],
  providers: [],
})
export class AppModule {}
