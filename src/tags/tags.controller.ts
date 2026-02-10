import { Body, Controller, Delete, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @Post()
  public createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Delete()
  public async delete(@Query('id') id: number) {
    return this.tagsService.delete(id);
  }
  // /tags/soft-delete
  @Delete('soft-delete')
  public async softDelete(@Query('id') id: number) {
    return this.tagsService.softRemove(id);
  }
}
