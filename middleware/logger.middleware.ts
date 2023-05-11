import { 
    Injectable,
    NestMiddleware,
    UnauthorizedException,
} from "@nestjs/common";

import {
    Request,
    Response,
    NextFunction 
} from 'express'

import { JwtService } from '@nestjs/jwt';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    constructor (private jwtService: JwtService) {}

    async use(req: Request, res:Response, next: NextFunction) {
        try {
            const token = req.headers.authorization
            if(!token) throw new UnauthorizedException()

            await this.jwtService.verifyAsync(token, {secret: process.env.SECRET_KEY})
            next()
        } catch (error) {
            throw new UnauthorizedException()
        }
    }
}