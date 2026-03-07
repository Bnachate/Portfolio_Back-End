import {
  Injectable,
  BadRequestException,
  RequestTimeoutException,
  ConflictException,
} from '@nestjs/common';
import { User } from '../users.entity';
import { DataSource } from 'typeorm';
import { CreateManyUserDto } from '../dtos/create-many-user.dto';

@Injectable()
export class UserCreateManyProvider {
  constructor(private readonly dataSource: DataSource) {}

  public async createMany(createManyUserDtos: CreateManyUserDto) {
    const newUsers: User[] = [];
    const queryRunner = this.dataSource.createQueryRunner();
    try {
      await queryRunner.connect();
      await queryRunner.startTransaction();
    } catch {
      throw new RequestTimeoutException('Could not start database transaction');
    }
    try {
      for (const userDto of createManyUserDtos.users) {
        const existingUser = await queryRunner.manager.findOne(User, {
          where: { email: userDto.email },
        });
        if (existingUser) {
          throw new BadRequestException(
            `The user with email ${userDto.email} already exists.`,
          );
        }
        const userInstance = queryRunner.manager.create(User, {
          ...userDto,
          admin: userDto.admin ? 1 : 0,
        });
        try {
          const result = await queryRunner.manager.save(userInstance);
          newUsers.push(result);
        } catch (error) {
          throw new BadRequestException(
            `Error saving user with email ${userDto.email}: ${error}`,
          );
        }
      }
      await queryRunner.commitTransaction();
      return newUsers;
    } catch {
      await queryRunner.rollbackTransaction();
      throw new ConflictException('Could not complete the transaction', {
        description:
          'One or more users could not be created, all changes have been reverted',
      });
    } finally {
      await queryRunner.release();
    }
  }
}
