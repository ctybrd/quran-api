import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFromDB(sql: string, db: string): string {
    return 'Index World!';
  }
}
