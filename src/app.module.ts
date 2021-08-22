import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost/catalog_user'),
    ConfigModule.forRoot({
      load:[configuration]
    })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
