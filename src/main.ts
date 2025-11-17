import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  // Abilita le validazioni globali
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Abilita CORS per le richieste frontend
  app.enableCors({
    origin: [
      'https://your-frontend-domain.onrender.com', // Sostituisci con il tuo dominio Render
      'http://localhost:3000',
      'http://localhost:3001',
    ],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
    credentials: true,
  });

  // Imposta il prefisso globale per le API
  app.setGlobalPrefix('api');

  // Usa la porta fornita da Render o default 3000
  const port = process.env.PORT || 3000;

  await app.listen(port, '0.0.0.0');

  console.log(`Application is running on: http://0.0.0.0:${port}`);
}

bootstrap();
