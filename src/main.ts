import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true
    })
  )



  const config = new DocumentBuilder()
  .setTitle('Boards App')
  .setDescription('The Boards App API description')
  .setVersion('1.0')
  .addTag('boards')
  .addTag('users')
  .addTag('tasks')
  .build();

  const Document=SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, Document);

  await app.listen(3000);
}
bootstrap();
