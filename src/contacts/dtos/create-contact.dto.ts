import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateContactDto {
  @ApiProperty({
    example: 'John Doe',
    description: 'This is the contact name',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  name: string;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(96)
  @IsNotEmpty()
  email: string;

  @ApiProperty({
    description: 'the subject of the message',
    example: 'The great company: we need you !',
  })
  @IsNotEmpty()
  @IsString()
  @MinLength(10)
  @MaxLength(1024)
  subject: string;

  @ApiProperty({
    description: 'This is the message deliver by the contact',
    example: 'The contact message',
  })
  @IsString()
  @IsNotEmpty()
  message: string;
}
