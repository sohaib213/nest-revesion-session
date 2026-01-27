import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { RequestWithUser } from '../interfaces/requestWithUser-interface';
import { JwtPayload } from '../interfaces/JwtPayload-interface';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private readonly jwtService: JwtService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const req: RequestWithUser = context.switchToHttp().getRequest();
    const token = this.extractToken(req);
    try {
      const payload: JwtPayload = await this.jwtService.verifyAsync(token);
      req.currentUser = payload;
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }

  extractToken(req: Request): string {
    const authorization = req.headers.authorization;
    if (!authorization) throw new UnauthorizedException('Token Not Found');
    const [type, token] = authorization.split(' ');
    if (type !== 'Bearer' || !token)
      throw new UnauthorizedException('Token Not Found');
    return token;
  }
}
