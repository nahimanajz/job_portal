import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';


function swaggerDocm (app:any) {
  const config = new DocumentBuilder()
    .setTitle('Job portal APIs')
    .setDescription('API documentation for Job listings, and job application management')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

    app.setGlobalPrefix('api/v1')

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document);

}
  async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const PORT = process.env.PORT ?? 3000
  const startCn = ()=> console.log(`app started on ${PORT} port`)
    // enable validations

    app.useGlobalPipes(new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted: true,
      transform: true
    }))
   // swagger
   swaggerDocm(app)

   await app.listen(PORT, startCn);
}
bootstrap();
