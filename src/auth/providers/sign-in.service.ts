import {
  forwardRef,
  Inject,
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { SignInDto } from '../dtos/signin.dto';
import { UsersService } from 'src/users/providers/users.service';
import { HashingService } from './hashing.service';
import { GenerateTokensService } from './generate-tokens.service';

@Injectable()
export class SignInService {
  constructor(
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,

    @Inject(HashingService)
    private readonly hashingService: HashingService,

    // @Inject(forwardRef(() => GenerateTokensService))
    private readonly generateTokensService: GenerateTokensService,
  ) {}

  public async signIn(signInDto: SignInDto) {
    let isEqual: boolean;
    const user = await this.usersService.findOneByEmail(signInDto.email);
    try {
      isEqual = await this.hashingService.comparePassword(
        signInDto.password,
        user.password,
      );
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Password comparison operation timed out',
      });
    }
    if (!isEqual) {
      throw new UnauthorizedException('Invalid credentials provided');
    }
    return await this.generateTokensService.generateTokens(user);
  }
}
