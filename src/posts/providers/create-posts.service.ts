import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreatePostDto } from '../dtos/create-post.dto';
import { User } from 'src/users/users.entity';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Tag } from 'src/tags/tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class CreatePostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    private readonly tagsService: TagsService,
  ) {}
  public async createPost(
    @Body() createPostDto: CreatePostDto,
    activeUser: ActiveUserData,
  ) {
    const { tags } = createPostDto;
    let existingTags: Tag[] = [];
    let author: User;
    try {
      author = await this.usersService.findOneById({ id: activeUser.sub });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    try {
      existingTags = await this.tagsService.findMultipleTags(tags);
    } catch {
      throw new BadRequestException('tags id does not exist');
    }
    if (existingTags.length !== tags?.length) {
      throw new BadRequestException('One or more tags id does not exist');
    }
    let post = this.postsRepository.create({
      ...createPostDto,
      author: author,
      tags: existingTags,
    });
    try {
      post = await this.postsRepository.save(post);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return post;
  }
}
