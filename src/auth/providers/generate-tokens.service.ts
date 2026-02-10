import { Inject, Injectable } from '@nestjs/common';
import jwtConfig from '../config/jwt.config';
import { JwtService } from '@nestjs/jwt';
import type { ConfigType } from '@nestjs/config';
import { User } from 'src/users/users.entity';
import { ActiveUserData } from '../interfaces/active-user-data.interface';

@Injectable()
export class GenerateTokensService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  public async signToken<T>(userId: number, expiresIn: number, payload?: T) {
    const basePayload = { sub: userId };
    const finalPayload = { ...basePayload, ...payload };

    return await this.jwtService.signAsync(finalPayload, {
      audience: this.jwtConfiguration.audience,
      issuer: this.jwtConfiguration.issuer,
      secret: this.jwtConfiguration.secret,
      expiresIn,
    });
  }

  public async generateTokens(user: User) {
    const [accessToken, refreshToken] = await Promise.all([
      this.signToken<Partial<ActiveUserData>>(
        user.id,
        this.jwtConfiguration.accessTokenTtl,
        {
          email: user.email,
        },
      ),
      this.signToken(user.id, +this.jwtConfiguration.refreshTokenTtl),
    ]);
    return { accessToken, refreshToken };
  }
}
