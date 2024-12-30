import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from your frontend
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
    credentials: true, // If cookies or authentication headers are required
  });

  await app.listen(process.env.PORT || 3006);
}
bootstrap();
