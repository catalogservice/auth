import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { HttpModule } from '@nestjs/axios';
import { UserModule } from './user/user.module';

@Module({
  imports: [
    UserModule,
    HttpModule,
    MongooseModule.forRoot('mongodb://localhost/catalog_auth'),
    ConfigModule.forRoot({
      isGlobal:true,
      load:[configuration]
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
