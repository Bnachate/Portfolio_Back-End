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

export class CreateProjectDto {
  @ApiProperty({
    example: 'This is a title',
    description: 'This is the title for the portfolio website',
  })
  @IsString()
  @MinLength(4)
  @MaxLength(512)
  @IsNotEmpty()
  title: string;

  @ApiProperty({
    description: 'This is the content of the project',
    example: 'The project content',
  })
  @IsString()
  @IsNotEmpty()
  description: string;

  @ApiProperty({
    description: 'An image for your project',
    example: 'http://localhost.com/images/image1.jpg',
  })
  @IsNotEmpty()
  @MinLength(4)
  @MaxLength(1024)
  @IsUrl()
  projectImageUrl?: string;

  @ApiProperty({
    description: 'The github url of your the project',
    example: 'http://my-url.com',
  })
  @IsNotEmpty()
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

  @ApiPropertyOptional({
    example:
      'the position is related to the order you would like to retrieve the project',
    description: 'This is the title for the portfolio website',
  })
  @IsInt()
  @IsOptional()
  position?: number;
}
