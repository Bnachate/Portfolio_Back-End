import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateExperienceDto } from '../dtos/create-experience.dto';
import { User } from 'src/users/users.entity';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Tag } from 'src/tags/tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../experiences.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class CreateExperiencesService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    private readonly tagsService: TagsService,
  ) {}
  public async createExperience(
    @Body() createExperienceDto: CreateExperienceDto,
    activeUser: ActiveUserData,
  ) {
    const { tags } = createExperienceDto;
    let existingTags: Tag[];
    let owner: User;
    try {
      owner = await this.usersService.findOneById({ id: activeUser.sub });
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
    const experience = this.experiencesRepository.create({
      ...createExperienceDto,
      owner: owner,
      tags: existingTags,
    });
    let newExperience: Experience;
    try {
      newExperience = await this.experiencesRepository.save(experience);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return newExperience;
  }
}
