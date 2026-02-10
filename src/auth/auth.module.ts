import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './providers/auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from 'src/users/users.module';
import { HashingService } from './providers/hashing.service';
import { BcryptService } from './providers/bcrypt.service';
import { SignInService } from './providers/sign-in.service';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { GenerateTokensService } from './providers/generate-tokens.service';
import { RefreshTokensService } from './providers/refresh-tokens.service';

@Module({
  providers: [
    AuthService,
    {
      provide: HashingService,
      useClass: BcryptService,
    },
    SignInService,
    GenerateTokensService,
    RefreshTokensService,
  ],
  controllers: [AuthController],
  imports: [
    forwardRef(() => UsersModule),
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  exports: [AuthService, HashingService],
})
export class AuthModule {}
