import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateTagDto {
  @ApiProperty()
  @IsString()
  @MinLength(3)
  @MaxLength(256)
  @IsNotEmpty()
  name: string;
}
