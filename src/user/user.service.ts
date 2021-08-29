import { HttpService } from "@nestjs/axios";
import { Inject, Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { ClientProxy } from "@nestjs/microservices";
import { userHttpService } from "./http.service";

@Injectable()
export class UserService {
    constructor(
        private httpService: HttpService,
        private configService: ConfigService,
        private userHttp: userHttpService,
        @Inject('AUTH_SERVICE') private readonly client: ClientProxy
    ) { }

    getUserByUsername(username: string): Promise<any> {
        return this.userHttp.http.get(`/user/${username}`);
    }

    createUser(user: any) {
        this.client.emit('NEW USER', JSON.stringify(user))
    }

}