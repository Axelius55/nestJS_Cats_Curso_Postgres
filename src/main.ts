import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, //si se envian otros datos tira error
      forbidNonWhitelisted: true,
      transform: true, //transformar datos siempre que se pueda
    }),
  );

  await app.listen(3000);
}
bootstrap();
