import { Injectable } from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { SignInService } from './sign-in.service';
import { RefreshTokensService } from './refresh-tokens.service';
import { RefreshTokenDto } from '../dtos/refresh-token.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly signInService: SignInService,
    private readonly refreshTokensService: RefreshTokensService,
  ) {}

  public signIn(signInDto: SignInDto) {
    return this.signInService.signIn(signInDto);
  }
  public async refreshTokens(refreshToken: RefreshTokenDto) {
    return await this.refreshTokensService.refreshTokens(refreshToken);
  }
}
