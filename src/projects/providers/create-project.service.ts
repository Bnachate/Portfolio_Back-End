import {
  BadRequestException,
  Body,
  Injectable,
  RequestTimeoutException,
} from '@nestjs/common';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { User } from 'src/users/users.entity';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { Tag } from 'src/tags/tags.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../projects.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class CreateProjectsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly tagsService: TagsService,
  ) {}
  public async createProject(
    @Body() createProjectDto: CreateProjectDto,
    activeUser: ActiveUserData,
  ) {
    const { tags } = createProjectDto;
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
    const project = this.projectsRepository.create({
      ...createProjectDto,
      owner: owner,
      tags: existingTags,
    });
    let newProject: Project;
    try {
      newProject = await this.projectsRepository.save(project);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return newProject;
  }
}
