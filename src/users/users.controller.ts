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
  @ApiOperation({ summary: 'Retrieve all registered users' })
  @ApiResponse({
    status: 200,
    description: 'Users list retrieved successfully.',
  })
  public getUsers() {
    return this.usersService.findAll();
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a specific user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the user',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'User details fetched successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public getUser(@Param() param: GetUsersParamDto) {
    return this.usersService.findOneById(param);
  }

  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    type: CreateUserDto,
    description: 'The data required to create a new user',
  })
  @ApiResponse({
    status: 201,
    description: 'User created successfully.',
  })
  @ApiResponse({
    status: 400,
    description: 'Invalid user data or email already exists.',
  })
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/create-many')
  @ApiOperation({ summary: 'Bulk create multiple users' })
  @ApiBody({
    type: CreateManyUserDto,
    description: 'List of users to be created',
  })
  @ApiResponse({
    status: 201,
    description: 'Users created successfully in bulk.',
  })
  public createManyUsers(@Body() createManyUserDtos: CreateManyUserDto) {
    return this.usersService.createManyUsers(createManyUserDtos);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing user' })
  @ApiBody({ type: PatchUserDto, description: 'The data fields to update' })
  @ApiResponse({
    status: 200,
    description: 'User updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public patchUser(@Body() patchUserDto: PatchUserDto) {
    return this.usersService.updateUser(patchUserDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a user by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the user to remove',
    example: '1',
    required: true,
  })
  @ApiResponse({
    status: 200,
    description: 'User deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'User not found.' })
  public deleteUser(@Param() param: GetUsersParamDto) {
    return this.usersService.deleteUser(param);
  }
}
