import { IsInt } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetContactsParamDto {
  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  id: number;
}
