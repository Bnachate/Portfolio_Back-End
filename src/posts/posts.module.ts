import { Module } from '@nestjs/common';
import { PostsService } from './providers/posts.service';
import { PostsController } from './posts.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from './posts.entity';
import { MetaOption } from 'src/meta-options/meta-options.entity';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreatePostsService } from './providers/create-posts.service';

@Module({
  controllers: [PostsController],
  providers: [PostsService, CreatePostsService],
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Post, MetaOption]),
    MetaOptionsModule,
  ],
})
export class PostsModule {}
