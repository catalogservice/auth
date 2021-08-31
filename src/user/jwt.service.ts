import { Injectable } from "@nestjs/common";
const jwt = require('jsonwebtoken');

@Injectable()
export class JwtService {
    readonly key = "secret";

    sign(payload){
        return jwt.sign(payload,this.key)
    }

    verify(token){
        return jwt.verify(token,this.key)
    }
    
    decode(token){
        return jwt.decode(token)
    }
}