import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import axios, { AxiosInstance } from "axios";

@Injectable()
export class UserHttpService {
    declare http: AxiosInstance
    constructor(
        private configService: ConfigService
    ) {
        this.http = axios.create({
            baseURL: configService.get('USER_API_URL'),
        })
        this.http.interceptors.request.use((request) => {
            return request
        })
        this.http.interceptors.response.use((response) => {
            return response
        })
    }
}