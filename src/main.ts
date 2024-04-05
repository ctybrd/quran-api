import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { readdirSync } from 'node:fs';
import { join } from 'node:path';
import { settings } from './settings';

function getDbFiles(path: string): string[] {
  return readdirSync(path, {
    recursive: false,
    encoding: 'utf8',
  }).filter((file) => file.endsWith('.db'));
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({ origin: '*' });

  let dbFiles = getDbFiles(join(__dirname));

  if (dbFiles.length === 0) {
    dbFiles = dbFiles = getDbFiles(join(__dirname, '..'));
  }

  settings.DB_INDEX = dbFiles.find((file) => file.startsWith('index'));
  settings.DB_FARSH = dbFiles.find((file) => file.startsWith('farsh'));
  settings.DB_DATA = dbFiles.find((file) => file.startsWith('data'));

  console.log(settings);

  if (!settings.DB_DATA || !settings.DB_FARSH || !settings.DB_INDEX) {
    console.error('missing database files found');
    return;
  }

  await app.listen(3000);
}
bootstrap();
