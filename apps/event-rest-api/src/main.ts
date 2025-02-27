import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';

import { TransformInterceptor } from './interceptors/success.interceptor';
import { HttpExceptionFilter } from './filters/exception.filter';
import { ErrorsInterceptor } from './interceptors/error.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 200,
  });

  app.setGlobalPrefix('api/v1');
  app.use(helmet());

  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new TransformInterceptor(),
    new ErrorsInterceptor(),
  );
  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(process.env.PORT);
  console.log(`Server is running on port ${process.env.PORT}`);
}

bootstrap();
