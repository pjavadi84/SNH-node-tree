import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';

// Pipe clean the data from incoming or outgoing data 
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  // ValidationPipe provides a convenient approach to enforce validation rules for all incoming client payloads
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      // transform input data to desired from e.g string -> integer
      transform: true,
    }),
  );
  app.enableCors();

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT') ?? 3000;
  await app.listen(port);
}
bootstrap();
