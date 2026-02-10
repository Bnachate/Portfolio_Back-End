import {
  Injectable,
  RequestTimeoutException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { Repository } from 'typeorm';

@Injectable()
export class FindOneUserByEmailService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  public async findByEmail(email: string) {
    let user: User | null;
    try {
      user = await this.userRepository.findOne({ where: { email } });
    } catch (error) {
      throw new RequestTimeoutException(error, {
        description: 'Database request timed out while finding user by email',
      });
    }
    if (!user) {
      throw new UnauthorizedException(
        'User with the provided email does not exist',
      );
    }
    return user;
  }
}
