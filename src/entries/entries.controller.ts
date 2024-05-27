import { Controller, Get, Query } from '@nestjs/common';

@Controller('/entries/en')
export class EntriesController {
  constructor() {}

  @Get()
  getAllEntries(@Query() query: any) {
    return `This action returns all entries, ${JSON.stringify(query)} `;
  }
}
