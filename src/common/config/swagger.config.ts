import { INestApplication } from '@nestjs/common';
import {
  DocumentBuilder,
  SwaggerCustomOptions,
  SwaggerModule,
} from '@nestjs/swagger';

const API_URL = process.env.BACKEND_URL || `${process.env.FRONTEND_URL}/be`;

const config = new DocumentBuilder()
  .addBearerAuth({ type: 'http', scheme: 'bearer' })
  .setTitle('Job board docs')
  .setDescription('Job board API documentation')
  .setVersion('1.0.0')
  .addTag('Home')
  .addTag('Authentication')


  .addServer(API_URL)
  .build();

const customOptions: SwaggerCustomOptions = {
  customSiteTitle: 'Jobboard API docs',
  swaggerOptions: {
    persistAuthorization: true,
  },
};

export const setupSwagger = (app: INestApplication): void => {
  const document = SwaggerModule.createDocument(app, config);
  return SwaggerModule.setup('api-docs', app, document, customOptions);
};
