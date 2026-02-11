import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import type { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from 'src/auth/config/jwt.config';
import { Request } from 'express';
import { REQUEST_USER_KEY } from 'src/auth/constants/auth.constants';
import { Reflector } from '@nestjs/core';

interface JwtPayload {
  sub: number;
  email: string;
}

@Injectable()
export class AccessTokenGuard implements CanActivate {
  constructor(
    private readonly reflector: Reflector,
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest<Request>();
    const token = this.extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException('No token provided');
    }
    try {
      const payload = await this.jwtService.verifyAsync<JwtPayload>(
        token,
        this.jwtConfiguration,
      );
      request[REQUEST_USER_KEY] = payload;
    } catch {
      throw new UnauthorizedException('Invalid token');
    }
    return true;
  }

  private extractTokenFromHeader(request: Request): string | undefined {
    const [_type, token] = request.headers.authorization?.split(' ') ?? [];
    return _type === 'Bearer' ? token : undefined;
  }
}
