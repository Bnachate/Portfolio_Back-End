import {
  Injectable,
  RequestTimeoutException,
  BadRequestException,
  Inject,
  forwardRef,
} from '@nestjs/common';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashingService } from 'src/auth/providers/hashing.service';
import { MailService } from 'src/mail/providers/mail.service';

@Injectable()
export class CreateUserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    @Inject(forwardRef(() => HashingService))
    private hashingService: HashingService,

    private readonly mailService: MailService,
  ) {}

  public async createUser(createUserDto: CreateUserDto) {
    let existingUser;
    try {
      existingUser = await this.usersRepository.findOne({
        where: { email: createUserDto.email },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (existingUser) {
      throw new BadRequestException(
        'The user already exists, please check your email.',
      );
    }
    let newUser = this.usersRepository.create({
      ...createUserDto,
      password: await this.hashingService.hashPassword(createUserDto.password),
    });
    try {
      newUser = await this.usersRepository.save(newUser);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    try {
      await this.mailService.sendUserWelcome(newUser);
      return newUser;
    } catch (error) {
      throw new RequestTimeoutException(error);
    }
  }
}
