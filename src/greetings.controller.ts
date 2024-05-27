import { CacheKey } from '@nestjs/cache-manager';
import { Controller, Get, UseInterceptors } from '@nestjs/common';
import { CustomCacheInterceptor } from './redis/cache.middleware';

@Controller()
export class GreetingsController {
  @Get()
  @UseInterceptors(CustomCacheInterceptor)
  @CacheKey('greetings')
  async getApiGreetings() {
    const greetings = {
      message: 'Fullstack Challenge 🏅 - Dictionary',
    };
    return greetings;
  }
}
