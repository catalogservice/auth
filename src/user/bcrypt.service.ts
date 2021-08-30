import { Injectable } from "@nestjs/common";
const bcrypt = require('bcrypt')

@Injectable()
export class BcryptService {
    constructor(){
    }
    hash(value) {
        return bcrypt.hashSync(value, 10)
    }
    compare(value, hash) {
        return bcrypt.compareSync(value, hash)
    }
}