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
  ApiOperation,
  ApiParam,
  ApiQuery,
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

  //   @Get('/:id?/{:optional}')
  @ApiOperation({
    summary: 'Fetches a user registered on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users fetched Successfully based on the query',
  })
  @ApiParam({
    name: 'id',
    description: 'Get user with a specific id',
    example: '1234',
    required: true,
  })
  @ApiQuery({
    name: 'limit',
    type: 'number',
    required: false,
    description: 'The number of entries returned per query',
    example: 10,
  })
  @ApiQuery({
    name: 'page',
    type: 'number',
    required: false,
    description:
      'The position of the page number that you want the API to return',
    example: 1,
  })
  @Get('/:id')
  public getUser(
    // @Param() getUserParamDto: GetUsersParamDto,
    @Param() param: GetUsersParamDto,
  ) {
    return this.usersService.findOneById(param);
  }

  @Post()
  @Auth(AuthType.None)
  @UseInterceptors(ClassSerializerInterceptor)
  public createUsers(@Body() createUserDto: CreateUserDto) {
    return this.usersService.createUser(createUserDto);
  }

  @Post('/create-many')
  public createManyUsers(@Body() createManyUserDtos: CreateManyUserDto) {
    return this.usersService.createManyUsers(createManyUserDtos);
  }

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
  public deleteUser(
    // @Param() getUserParamDto: GetUsersParamDto,
    @Param() param: GetUsersParamDto,
  ) {
    return this.usersService.deleteUser(param);
  }
}
