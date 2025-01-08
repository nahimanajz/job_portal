import { BadRequestException, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { setupSwagger } from './common/config';
import { PORT } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = [
    process.env.FRONTEND_URL,
    'http://localhost:3000',
  ];

  app.enableCors({ origin: allowedOrigins }); 
  app.setGlobalPrefix('api/v1');

  setupSwagger(app);

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map((error) => {
          const msg = error?.constraints[Object.keys(error?.constraints)?.[0]];
          const message = msg?.replace(/([A-Z])/g, ' $1').trim();
          const err = {
            property: error.property,
            message:
              message?.[0]?.toUpperCase() +
              message?.slice(1, message?.length)?.toLocaleLowerCase(),
          };
          return err;
        });
        return new BadRequestException(result);
      },
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.use(helmet());


  await app.listen(PORT, async () => {
    console.log(`Server is running on port ${PORT}`);
  });
}

bootstrap();
