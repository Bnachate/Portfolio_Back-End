import { CreateUserDto } from './create-user.dto';
import { IsInt, IsNotEmpty } from 'class-validator';
import { ApiProperty, PartialType } from '@nestjs/swagger';

export class PatchUserDto extends PartialType(CreateUserDto) {
  @ApiProperty({
    description: 'The ID of the post that needs to be updated',
  })
  @IsInt()
  @IsNotEmpty()
  id: number;
}
