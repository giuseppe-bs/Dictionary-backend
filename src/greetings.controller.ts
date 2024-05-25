import { Controller, Get } from '@nestjs/common';

@Controller()
export class GreetingsController {
  @Get()
  async getApiGreetings() {
    const greetings = {
      message: 'Fullstack Challenge 🏅 - Dictionary',
    };
    return greetings;
  }
}
