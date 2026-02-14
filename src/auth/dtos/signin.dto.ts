import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class SignInDto {
  @ApiProperty({
    example: 'john.doe@gmail.com',
  })
  @IsEmail()
  @IsNotEmpty()
  email: string;
  @ApiProperty({
    description: 'This ',
    example: 'Password123#',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
