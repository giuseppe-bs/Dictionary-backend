import { Module } from '@nestjs/common';
import { GreetingsController } from './greetings.controller';

@Module({
  imports: [],
  controllers: [GreetingsController],
  providers: [],
})
export class AppModule {}
