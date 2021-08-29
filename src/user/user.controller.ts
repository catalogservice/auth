import { Body, Controller, Inject, Post } from "@nestjs/common";
import { LoginDto } from "./dto/loginDto";
import { RegisterDto } from "./dto/registerDto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService
    ) { }
    @Post('/login')
    async login(@Body() body: LoginDto) {
        let response = await this.userService.getUserByUsername(body.username);
        if (!response.data) return 'no response';
        return response.data;
    }

    @Post('/register')
    async register(@Body() body: RegisterDto) {
        let response = await this.userService.getUserByUsername(body.username);
        if (!response.data) return 'no response';
        if (response.data._id) return 'user already exists';
        this.userService.createUser(body)
        return 'success';
    }
}