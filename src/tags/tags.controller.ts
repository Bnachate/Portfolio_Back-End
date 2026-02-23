import { Body, Controller, Delete, Get, Post, Query } from '@nestjs/common';
import { CreateTagDto } from './dtos/create-tag.dto';
import { TagsService } from './providers/tags.service';
import { ApiResponse } from '@nestjs/swagger';

@Controller('tags')
export class TagsController {
  constructor(private readonly tagsService: TagsService) {}

  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if your tags are retrieved successfully',
  })
  @Get()
  public getTags() {
    return this.tagsService.findAll();
  }
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if your tag is created successfully',
  })
  @Post()
  public createTag(@Body() createTagDto: CreateTagDto) {
    return this.tagsService.createTag(createTagDto);
  }

  @Delete()
  public async delete(@Query('id') id: number) {
    return this.tagsService.delete(id);
  }
  @Delete('soft-delete')
  public async softDelete(@Query('id') id: number) {
    return this.tagsService.softRemove(id);
  }
}
