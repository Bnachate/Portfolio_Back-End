import { IsNotEmpty, IsArray, ValidateNested } from 'class-validator';
import { CreateUserDto } from './create-user.dto';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class CreateManyUserDto {
  @ApiProperty({
    type: 'array',
    required: true,
    items: {
      type: 'User',
    },
    description: 'Array of users to be created',
    example: [
      {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
      },
    ],
  })
  @IsNotEmpty()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateUserDto)
  users: CreateUserDto[];
}
