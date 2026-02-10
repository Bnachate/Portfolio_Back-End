import {
  Injectable,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetUsersParamDto } from '../dtos/get-users-params.dto';
import { CreateUserDto } from '../dtos/create-user.dto';
import { Repository } from 'typeorm';
import { User } from '../users.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { PatchUserDto } from '../dtos/patch-user.dto';
import { UserCreateManyProvider } from './user-create-many.service';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';
import { CreateUserService } from './create-user.service';
import { FindOneUserByEmailService } from './find-one-user-by-email.service';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,

    private readonly userscreateManyProvider: UserCreateManyProvider,

    private readonly createUserService: CreateUserService,

    private readonly findOneUserByEmailService: FindOneUserByEmailService,
  ) {}

  public async findAll() {
    let allUsers: CreateUserDto[] | undefined = undefined;
    allUsers = await this.usersRepository.find();
    if (!allUsers) {
      throw new HttpException(
        {
          status: HttpStatus.MOVED_PERMANENTLY,
          error: 'The API Endpoint does not exist',
          fileName: 'users.service.ts',
          lineNumber: 88,
        },
        HttpStatus.MOVED_PERMANENTLY,
        {
          cause: new Error(),
          description: 'Occured because the API endpoint was permanently moved',
        },
      );
    }
    return allUsers;
  }

  public async findOneById(getUsersParamDto: GetUsersParamDto) {
    let user: User | null = null;
    // console.log('getUserParamDto', getUsersParamDto);
    // console.log('users', users);
    try {
      user = await this.usersRepository.findOne({
        where: { id: getUsersParamDto.id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!user) {
      throw new BadRequestException('The user id does not exist');
    }
    return user;
  }

  public async createUser(createUserDto: CreateUserDto) {
    return await this.createUserService.createUser(createUserDto);
  }

  public async createManyUsers(createManyUserDtos: CreateManyUserDto) {
    return await this.userscreateManyProvider.createMany(createManyUserDtos);
  }

  public async findOneByEmail(email: string) {
    return await this.findOneUserByEmailService.findByEmail(email);
  }

  public async updateUser(patchUserDto: PatchUserDto) {
    try {
      const existingUser = await this.usersRepository.findOne({
        where: { id: patchUserDto.id },
      });
      if (!existingUser) {
        throw new BadRequestException(
          'The user does not exists in the database',
        );
      }

      let updatedUser = this.usersRepository.merge(existingUser, patchUserDto);
      try {
        updatedUser = await this.usersRepository.save(updatedUser);
      } catch {
        throw new RequestTimeoutException(
          'Unable to process your request at the moment. Please try later',
          {
            description: 'Error connecting to the database',
          },
        );
      }

      return updatedUser;
    } catch (error) {
      console.error(error);
    }
  }

  public async deleteUser(param: GetUsersParamDto) {
    const user = await this.usersRepository.findOne({
      where: { id: param.id },
    });
    if (!user) {
      return { deleted: false, message: 'User not found' };
    }
    await this.usersRepository.delete(param.id);

    const userId = param.id;
    return { deleted: true, userId };
  }
}
