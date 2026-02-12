import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  ClassSerializerInterceptor,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { PatchUserDto } from './dtos/patch-user.dto';
import { UsersService } from './providers/users.service';
import {
  ApiBody,
  ApiOperation,
  ApiParam,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { GetUsersParamDto } from './dtos/get-users-params.dto';
import { CreateManyUserDto } from './dtos/create-many-user.dto';
import { Auth } from 'src/auth/decorator/auth.decorator';
import { AuthType } from 'src/auth/enums/auth-type.enum';

@Controller('users')
@ApiTags('Users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  public getUsers() {
    return this.usersService.findAll();
  }

  @ApiOperation({
    summary: 'Fetches a user registered on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched Successfully based on the query',
  })
  @Get('/:id')
  public getUser(@Param() param: GetUsersParamDto) {
    return this.usersService.findOneById(param);
  }

  @ApiOperation({
    summary: 'Create a user on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users created Successfully based on the query',
  })
  @ApiBody({
    type: CreateUserDto,
    description: 'The data to create a user',
  })
  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/create-many')
  @ApiBody({
    type: CreateManyUserDto,
    description: 'The data to create many users',
  })
  public createManyUsers(@Body() createManyUserDtos: CreateManyUserDto) {
    return this.usersService.createManyUsers(createManyUserDtos);
  }

  @ApiOperation({
    summary: 'Update a user on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users updated Successfully based on the query',
  })
  @ApiBody({
    type: PatchUserDto,
    description: 'The data to update a user',
  })
  @Patch()
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return this.usersService.updateUser(patchUserDto);
  }

  @ApiOperation({
    summary: 'Delete a user registered on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users deleted Successfully based on the query',
  })
  @ApiParam({
    name: 'id',
    description: 'Delete user with a specific id',
    example: '1234',
    required: true,
  })
  @Delete('/:id')
  public deleteUser(@Param() param: GetUsersParamDto) {
    return this.usersService.deleteUser(param);
  }
}
