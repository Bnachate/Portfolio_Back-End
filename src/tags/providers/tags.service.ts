import { Injectable } from '@nestjs/common';
import { CreateTagDto } from '../dtos/create-tag.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from '../tags.entity';
import { In, Repository } from 'typeorm';

@Injectable()
export class TagsService {
  constructor(
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}
  public async createTag(createTagDto: CreateTagDto) {
    const newTag = this.tagRepository.create(createTagDto);
    return await this.tagRepository.save(newTag);
  }
  public async findMultipleTags(tags: number[] | undefined) {
    if (!tags) return [];
    const results = await this.tagRepository.find({
      where: {
        id: In(tags),
      },
    });

    return results;
  }

  public async delete(id: number) {
    await this.tagRepository.delete(id);
    return {
      deleted: true,
      id,
    };
  }
  public async softRemove(id: number) {
    await this.tagRepository.softDelete(id);
    return {
      deleted: true,
      id,
    };
  }
}
