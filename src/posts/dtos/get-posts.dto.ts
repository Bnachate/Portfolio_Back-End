import { IsDate, IsOptional } from 'class-validator';
import { IntersectionType } from '@nestjs/swagger';
import { PaginationQueryDto } from '../../common/pagination/dtos/pagination-query.dto';
class GetPostsbaseDto {
  @IsDate()
  @IsOptional()
  startDate?: Date;

  @IsDate()
  @IsOptional()
  endDate?: Date;
}

export class GetPostsDto extends IntersectionType(
  GetPostsbaseDto,
  PaginationQueryDto,
) {}
