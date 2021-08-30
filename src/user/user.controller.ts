import { Body, Controller, Inject, Post } from "@nestjs/common";
import { BcryptService } from "./bcrypt.service";
import { LoginDto } from "./dto/loginDto";
import { RegisterDto } from "./dto/registerDto";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {
    constructor(
        private userService: UserService,
        private bcryptService: BcryptService
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
        let newUser:any = body;
        newUser.password = this.bcryptService.hash(body.password)
        this.userService.createUser(newUser)
        return 'success';
    }
}