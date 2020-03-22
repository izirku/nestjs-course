import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { ValidationError } from 'class-validator';
import { AppModule } from './app.module';
import { ValidationException } from './filters/validation.exception';
import { ValidationFilter } from './filters/validation.filter';

async function bootstrap() {
  // app is an instance of Express
  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api');
  // applying filters globaly
  // app.useGlobalFilters(new HttpExceptionFilter())

  // note: order matters, most generic first, most specific last
  // app.useGlobalFilters(new FallbackExceptionFilter(), new ValidationFilter());
  app.useGlobalFilters(new ValidationFilter());

  app.useGlobalPipes(
    new ValidationPipe({
      skipMissingProperties: true,
      exceptionFactory: (errors: ValidationError[]) => {
        const messages = errors.map(
          error => `${error.property} has wrong value ${error.value},
      ${Object.values(error.constraints).join(', ')}`,
        );

        return new ValidationException(messages);
      },
    }),
  );

  await app.listen(9000);
}

bootstrap();
