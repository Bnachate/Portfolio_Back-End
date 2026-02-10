import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetPostsParamDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
