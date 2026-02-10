import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetProjectsParamDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
