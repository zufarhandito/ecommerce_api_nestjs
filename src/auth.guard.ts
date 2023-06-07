import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from './metadata';
import { Reflector } from '@nestjs/core';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService, private reflector: Reflector) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (isPublic) return true;
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);
    // const token = request.headers.authorization
    if (!token) throw new UnauthorizedException({ 
      status: 401,
      message: 'Token tidak ada' });

    try {
      await this.jwtService.verifyAsync(token, {
        secret: process.env.SECRET_KEY,
      });
      // request['username'] = payload;
    } catch (error) {
      throw new UnauthorizedException({ 
        status: 403,
        message: 'Token tidak valid' });
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers['authorization']?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
