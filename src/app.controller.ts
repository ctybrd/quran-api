import { Controller, Get, Query } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  private DB_INDEX = 'index_v8.db';
  private DB_DATA = 'data_v16.db';
  private DB_FARSH = 'farsh_v6.db';

  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('i')
  getIndex(@Query('sql') sql: string): string[] {
    return this.appService.getFromDB(sql, this.DB_INDEX);
  }

  @Get('d')
  getData(@Query('sql') sql: string): string[] {
    return this.appService.getFromDB(sql, this.DB_DATA);
  }

  @Get('f')
  getFarsh(@Query('sql') sql: string): string[] {
    return this.appService.getFromDB(sql, this.DB_FARSH);
  }
}
