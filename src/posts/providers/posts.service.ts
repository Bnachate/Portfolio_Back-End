import {
  Body,
  Injectable,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { GetPostsParamDto } from 'src/posts/dtos/get-posts-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from '../posts.entity';
import { Repository } from 'typeorm';
import { PatchPostDto } from '../dtos/patch-post.dto';
import { Tag } from 'src/tags/tags.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { GetPostsDto } from '../dtos/get-posts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreatePostsService } from './create-posts.service';
import { CreatePostDto } from '../dtos/create-post.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
// import { MetaOption } from 'src/meta-options/meta-options.entity';

@Injectable()
export class PostsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Post)
    private postsRepository: Repository<Post>,
    // @InjectRepository(MetaOption)
    // private metaOptionRepository: Repository<MetaOption>,
    private readonly tagsService: TagsService,

    private readonly paginationProvider: PaginationProvider,

    private readonly createPostsService: CreatePostsService,
  ) {}

  public async findAll(postQuery: GetPostsDto): Promise<Paginated<Post>> {
    const allPosts = await this.paginationProvider.paginateQuery(
      postQuery,
      this.postsRepository,
    );
    if (!allPosts) {
      throw new HttpException(
        {
          status: HttpStatus.MOVED_PERMANENTLY,
          error: 'The API Endpoint does not exist',
          fileName: 'pots.service.ts',
          lineNumber: 33,
        },
        HttpStatus.MOVED_PERMANENTLY,
        {
          cause: new Error(),
          description: 'Occured because the API endpoint was permanently moved',
        },
      );
    }
    return allPosts;
  }

  public async findOne(getPostsParamDto: GetPostsParamDto) {
    let post: Post | null = null;
    try {
      post = await this.postsRepository.findOne({
        where: { id: getPostsParamDto.id },
        // relations: {
        //   metaOptions: true,
        // },
        // is better to use Eager
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!post) {
      {
        throw new BadRequestException('The post id does not exist');
      }
    }
    return post;
  }
  // DIRTY its bette to use CASCADE
  // public async createPost(@Body() createPostDto: CreatePostDto) {
  //   const metaOptions = createPostDto.metaOptions
  //     ? this.metaOptionRepository.create(createPostDto.metaOptions)
  //     : null;
  //   const post = this.postsRepository.create(createPostDto);
  //   if (metaOptions) {
  //     await this.metaOptionRepository.save(metaOptions);
  //     post.metaOptions = metaOptions;
  //   }

  //   return await this.postsRepository.save(post);
  // }
  public async createPost(
    createPostDto: CreatePostDto,
    activeUser: ActiveUserData,
  ) {
    return this.createPostsService.createPost(createPostDto, activeUser);
  }

  public async updatePost(patchPostDto: PatchPostDto) {
    let tags: Tag[];
    let post: Post | null;
    try {
      tags = await this.tagsService.findMultipleTags(patchPostDto.tags);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (
      !tags ||
      !patchPostDto?.tags ||
      tags.length !== patchPostDto.tags.length
    ) {
      throw new BadRequestException(
        'Please check your tag Uds and ensure they are correct',
      );
    }
    try {
      post = await this.postsRepository.findOne({
        where: { id: patchPostDto.id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!post) {
      throw new BadRequestException('The post does not exists in the database');
    }
    const newPost = {
      ...patchPostDto,
      tags: tags,
    };
    let updatePost = this.postsRepository.merge(post, newPost);
    try {
      updatePost = await this.postsRepository.save(updatePost);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return updatePost;
  }
  // is better to use bidirectional relation between tables
  // public async deletePost(param: GetPostsParamDto) {
  //   const post = await this.postsRepository.findOne({
  //     where: { id: param.id },
  //   });
  //   if (!post) {
  //     return { deleted: false, message: 'User not found' };
  //   }
  //   await this.postsRepository.delete(param.id);
  //   if (post.metaOptions) {
  //     await this.metaOptionRepository.delete(post.metaOptions.id);
  //   }

  //   const postId = param.id;
  //   return { deleted: true, postId };
  // }
  public async deletePost(param: GetPostsParamDto) {
    const postId = param.id;
    await this.postsRepository.delete(postId);
    return { deleted: true, postId };
  }
}
