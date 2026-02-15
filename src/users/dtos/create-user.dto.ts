import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsString,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  MinLength,
  MaxLength,
  Matches,
  IsIn,
  IsUrl,
} from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @MaxLength(96)
  firstName: string;

  @ApiProperty()
  @IsString()
  @IsOptional()
  @MinLength(3)
  @MaxLength(96)
  lastName?: string;

  @ApiProperty()
  @IsNotEmpty()
  admin: boolean;

  @ApiProperty()
  @IsString()
  @IsEmail()
  @MaxLength(96)
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @MaxLength(96)
  @Matches(/^(?=.*[A-Za-z])(?=.*\d)(?=.*[^A-Za-z0-9])[^\s]{8,16}$/, {
    message:
      'Minimum eight character, at least one letter, one number, one special character',
  })
  password: string;

  @ApiPropertyOptional({
    description: 'This is the job title',
    example: 'Developer Full-Stack',
  })
  @IsString()
  @IsOptional()
  @MaxLength(150)
  job: string;

  @ApiPropertyOptional({
    description: 'This is the description below job title',
    example: 'The hero title part',
  })
  @IsString()
  @IsOptional()
  title: string;

  @ApiPropertyOptional({
    description: 'This is the description of hero part',
    example: 'The hero content',
  })
  @IsString()
  @IsOptional()
  description: string;

  @ApiPropertyOptional({
    description: 'the github link',
    example: 'https://github.com/[username]/',
  })
  @IsOptional()
  @MinLength(4)
  @MaxLength(1024)
  @IsUrl()
  githubUrl: string;

  @ApiPropertyOptional({
    description: 'the linked In link',
    example: 'https://www.linkedin.com/in/[username]/',
  })
  @IsOptional()
  @MinLength(4)
  @MaxLength(1024)
  @IsUrl()
  linkedinUrl: string;
}
