import {
  IsArray,
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
    example: 'This is a title',
    description: 'This is the title for the portfolio website',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiPropertyOptional({
    description: 'This is the content of the experience',
    example: 'The experience content',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiPropertyOptional({
    description: 'An image for your experience',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsOptional()
  @MinLength(4)
  @MaxLength(1024)
  @IsUrl()
  projectImageUrl?: string;

  @ApiPropertyOptional({
    description: 'An image for your experience',
    example: 'http://my-url.com',
  })
  @IsOptional()
  @MinLength(4)
  @MaxLength(1024)
  @IsUrl()
  githubUrl?: string;

  @ApiPropertyOptional({
    description: 'Array of ids of',
    example: [1, 2],
  })
  @IsOptional()
  @IsArray()
  @IsInt({ each: true })
  tags?: number[];

  @ApiProperty({
    example:
      'the position is related to the order you would like to retrieve the experience',
    description: 'This is the title for the portfolio website',
  })
  @IsInt()
  @IsNotEmpty()
  position: number;
}
