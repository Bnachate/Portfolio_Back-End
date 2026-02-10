import { Injectable } from '@nestjs/common';
import { CreatePostMetaOptionsDto } from '../dtos/create-posts-meta-options.dto';
import { Repository } from 'typeorm';
import { MetaOption } from '../meta-options.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class MetaOptionsService {
  constructor(
    @InjectRepository(MetaOption)
    private readonly metaOptionsRepository: Repository<MetaOption>,
  ) {}
  public async create(createPostsMetaOptionsDto: CreatePostMetaOptionsDto) {
    const metaOptions = this.metaOptionsRepository.create(
      createPostsMetaOptionsDto,
    );
    return await this.metaOptionsRepository.save(metaOptions);
  }
}
