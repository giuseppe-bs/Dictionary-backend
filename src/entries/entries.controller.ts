import {
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { EntriesService } from './entries.service';
import { CustomCacheInterceptor } from 'src/redis/cache.middleware';
import { User } from 'src/user/auth/user.decorator';
import { JwtAuthGuard } from 'src/user/auth/auth.guard';

@Controller('/entries/en')
export class EntriesController {
  constructor(private entriesService: EntriesService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CustomCacheInterceptor)
  async getAllEntries(@Query() query: any) {
    return await this.entriesService.getAllEntries(query);
  }

  @Get('/:word')
  @UseGuards(JwtAuthGuard)
  @UseInterceptors(CustomCacheInterceptor)
  async getWordDetail(@Param() param: any, @User() user: any){
    const detail = await this.entriesService.getWordDetail(param.word);
    await this.entriesService.saveWordInHistory(param.word, user);
    return detail;
  }

  @Post('/:word/favorite')
  @UseGuards(JwtAuthGuard)
  async favoriteWord(@Param() param: any, @User() user: any) {
    return await this.entriesService.favoriteWord(param.word, user);
  }
}
