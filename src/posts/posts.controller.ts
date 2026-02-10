import { Controller, Query } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreatePostDto } from './dtos/create-post.dto';
import { PatchPostDto } from './dtos/patch-post.dto';
import { GetPostsParamDto } from './dtos/get-posts-params.dto';
import { GetPostsDto } from './dtos/get-posts.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('posts')
@ApiTags('Posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  public getPosts(@Query() postQuery: GetPostsDto) {
    return this.postsService.findAll(postQuery);
  }

  @Get('/:id')
  public getPost(@Param() param: GetPostsParamDto) {
    return this.postsService.findOne(param);
  }

  @ApiOperation({
    summary: 'Creates a new blog post',
  })
  @ApiResponse({
    status: 201,
    description: 'You get a 201 response if you post is created successfully',
  })
  @Post()
  public createPosts(
    @Body() createPostDto: CreatePostDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.postsService.createPost(createPostDto, activeUser);
  }

  @ApiOperation({
    summary: 'Updates an existing blog post',
  })
  @ApiResponse({
    status: 200,
    description: 'You get a 200 response if you post is updated successfully',
  })
  @Patch()
  public updatePost(@Body() patchPostDto: PatchPostDto) {
    return this.postsService.updatePost(patchPostDto);
  }

  @ApiOperation({
    summary: 'Delete a user registered on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users deleted Successfully based on the query',
  })
  @ApiParam({
    name: 'id',
    description: 'Delete user with a specific id',
    example: '1234',
    required: true,
  })
  @Delete('/:id')
  public deleteUser(
    // @Param() getUserParamDto: GetUsersParamDto,
    @Param() param: GetPostsParamDto,
  ) {
    return this.postsService.deletePost(param);
  }
}
