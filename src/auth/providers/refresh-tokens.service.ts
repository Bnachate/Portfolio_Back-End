import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';
import { JwtService } from '@nestjs/jwt';
import jwtConfig from '../config/jwt.config';
import type { ConfigType } from '@nestjs/config';
import { GenerateTokensService } from './generate-tokens.service';
import { UsersService } from 'src/users/providers/users.service';

@Injectable()
export class RefreshTokensService {
  constructor(
    private readonly jwtService: JwtService,

    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,

    private readonly generateTokensService: GenerateTokensService,

    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}
  public async refreshTokens(refreshToken: RefreshTokenDto) {
    try {
      const { sub } = (await this.jwtService.verifyAsync<{ sub: number }>(
        refreshToken.refreshToken,
        {
          secret: this.jwtConfiguration.secret,
          audience: this.jwtConfiguration.audience,
          issuer: this.jwtConfiguration.issuer,
        },
      )) as { sub: number };
      const user = await this.usersService.findOneById({ id: sub });
      return await this.generateTokensService.generateTokens(user);
    } catch (error) {
      throw new UnauthorizedException(error);
    }
  }
}
