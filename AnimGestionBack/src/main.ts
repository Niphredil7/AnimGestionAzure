import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { HttpExceptionFilter } from './utils/http.exception.filter';
import { AuthGuard } from './auth/guard/access-token.guard';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin:
      'https://animgestion-front-h9cwazb0a7erf6cx.francecentral-01.azurewebsites.net',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  app.useGlobalGuards(app.get(AuthGuard));

  app.useGlobalPipes(
    new ValidationPipe({
      //     disableErrorMessages: true,
      whitelist: true,
      transform: true,
      // transformOptions: { enableImplicitConversion: true },
    }),
  );
  app.useGlobalFilters(new HttpExceptionFilter());
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
