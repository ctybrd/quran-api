import { BadRequestException, Injectable } from '@nestjs/common';
import * as Database from 'better-sqlite3';
@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello World!';
  }

  getFromDB(sql: string, dbFile: string): string[] {
    if (!sql) {
      return [];
    }

    const readonly = true;
    const db = new Database(dbFile, { readonly });
    try {
      if (!readonly) {
        db.pragma('journal_mode = WAL');
      }
    } catch (err) {
      db.close && db.close();
      throw new BadRequestException(`${err.code}: ${err.message}\n`);
    }

    let rows = [];
    try {
      if (sql.toLowerCase().includes('select')) {
        rows = db.prepare(sql).all();
      } else {
        db.prepare(sql).run();
      }
    } catch (err) {
      db.close();
      throw new BadRequestException(`${err.code}: ${err.message}\n`);
    }

    db.close();
    return rows;
  }
}
