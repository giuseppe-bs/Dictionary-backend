import { Module } from '@nestjs/common';
import { GreetingsController } from './greetings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { MongoDBConfigService } from './config/mongodb.config.service';
import { ConfigModule } from '@nestjs/config';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: MongoDBConfigService,
      inject: [MongoDBConfigService],
    }),
  ],
  controllers: [GreetingsController],
  providers: [],
})
export class AppModule {}
