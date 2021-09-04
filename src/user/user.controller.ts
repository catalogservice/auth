import { Body, Controller, Get, Post, Req, Res } from "@nestjs/common";
import { Request, Response } from "express";
import { BcryptService } from "./bcrypt.service";
import { LoginDto } from "./dto/loginDto";
import { RegisterDto } from "./dto/registerDto";
import { JwtService } from "./jwt.service";
import { UserService } from "./user.service";

@Controller('user')
export class UserController {

    constructor(
        private userService: UserService,
        private bcryptService: BcryptService,
        private jwtService: JwtService
    ) { }

    @Post('/login')
    async login(@Body() body: LoginDto, @Res() res: Response) {
        let dbUserResponse = await this.userService.getUserByUsername(body.username);
        if (!dbUserResponse.data) return res.send('no response');
        let { password } = dbUserResponse.data;
        if (!password) return res.send(dbUserResponse);
        if (!this.bcryptService.compare(body.password, password)) return res.send('password does not match');
        let userPayload: any = { username: dbUserResponse.data.username, first_name: dbUserResponse.data.first_name, last_name: dbUserResponse.data.last_name }
        if (dbUserResponse.data.middle_name) userPayload.middle_name = dbUserResponse.data.middle_name;
        let token = this.jwtService.sign(userPayload)
        res.setHeader('Authorization', `Bearer ${token}`);
        return res.json(userPayload)
    }

    @Post('/register')
    async register(@Body() body: RegisterDto) {
        let response = await this.userService.getUserByUsername(body.username);
        if (!response.data) return 'no response';
        if (response.data._id) return 'user already exists';
        let newUser: any = body;
        newUser.password = this.bcryptService.hash(body.password)
        this.userService.createUser(newUser)
        return 'success';
    }

    @Get('/me')
    async getCurrentUser(@Req() req: Request) {
        let authorization = req.headers['authorization'];
        if (!authorization) return "no authorization found";
        try {
            let jwtTokenPayload = this.jwtService.verify(authorization.split(' ')[1]);
            let response = await this.userService.getUserByUsername(jwtTokenPayload.username);
            return response.data;
        } catch (e) {
            return e.message
        }
    }
}