import { forwardRef, Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './providers/users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './users.entity';
import { UserCreateManyProvider } from './providers/user-create-many.service';
import { CreateUserService } from './providers/create-user.service';
import { FindOneUserByEmailService } from './providers/find-one-user-by-email.service';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UserCreateManyProvider,
    CreateUserService,
    FindOneUserByEmailService,
  ],
  exports: [UsersService],
  imports: [TypeOrmModule.forFeature([User]), forwardRef(() => AuthModule)],
})
export class UsersModule {}
