import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn', 'debug', 'verbose'],
  });

  const config = new DocumentBuilder()
    .setTitle('SmartFit API')
    .setDescription('API per gestione utenti, attivazioni, schede e storico')
    .setVersion('1.0')
    .addTag('users')
    .addTag('schede')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document); // <---- URL docs

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
