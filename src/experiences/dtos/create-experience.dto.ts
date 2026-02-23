import {
  IsArray,
  IsDate,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  MaxLength,
  MinLength,
} from 'class-validator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';

export class CreateExperienceDto {
  @ApiProperty({
    example: 'Developer Full Stack',
    description: 'This is the job title of the experience',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  job: string;

  @ApiProperty({
    example: 'TheBestCompanyEver',
    description: 'This is the company name of the experience',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  company: string;

  @ApiProperty({
    description: 'This is the content of the experience',
    example: 'The description of the experience',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description:
      'this is the logo url of the company which you worked for in the experience',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsOptional()
  @MinLength(4)
  @MaxLength(1024)
  @IsUrl()
  logoUrl?: string;

  @ApiPropertyOptional({
    description: 'Array of ids of',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiProperty({
    description: 'The date you start the experience',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsDate()
  @IsNotEmpty()
  startDate: Date;

  @ApiPropertyOptional({
    description: 'The date you end the experience',
    example: '2024-03-16T07:46:32+0000',
  })
  @IsDate()
  @IsOptional()
  endDate?: Date;

  @ApiPropertyOptional({
    example: 1,
    description:
      'the position is related to the order you would like to retrieve the experience',
  })
  @IsInt()
  @IsOptional()
  position?: number;
}
