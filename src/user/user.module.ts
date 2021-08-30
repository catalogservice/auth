import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { BcryptService } from './bcrypt.service';
import { UserHttpService } from './http.service';
import { JwtService } from './jwt.service';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [
    HttpModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        baseURL: configService.get('USER_API_URL'),
      }),
      inject: [ConfigService],
    }),
    ClientsModule.register([
      {
        name: 'AUTH_SERVICE',
        transport: Transport.RMQ,
        options: {
          urls: ['amqps://ehegtylh:7ON6hfhly8-fMpiZ9Ev-d6IY2c-WMDXm@puffin.rmq2.cloudamqp.com/ehegtylh'],
          queue: 'catalog_authentication',
        },
      },
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, UserHttpService, BcryptService, JwtService],
  exports: [UserService]
})
export class UserModule { }