import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqps://ehegtylh:7ON6hfhly8-fMpiZ9Ev-d6IY2c-WMDXm@puffin.rmq2.cloudamqp.com/ehegtylh'],
      queue: 'catalog_authentication',
    },
  });
  app.useGlobalPipes(new ValidationPipe());
  app.enableCors();
  const config = new DocumentBuilder()
    .setTitle('Catalog Authentication Service')
    .setDescription('Authentication service for catalog')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  await app.startAllMicroservices();
  await app.listen(process.env.PORT);
}
bootstrap();
