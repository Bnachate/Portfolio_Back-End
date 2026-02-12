import {
  Body,
  Injectable,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { GetProjectsParamDto } from 'src/projects/dtos/get-projects-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../projects.entity';
import { Repository } from 'typeorm';
import { PatchProjectDto } from '../dtos/patch-project.dto';
import { Tag } from 'src/tags/tags.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { GetProjectsDto } from '../dtos/get-projects.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateProjectsService } from './create-project.service';
import { CreateProjectDto } from '../dtos/create-project.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class ProjectsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Project)
    private projectsRepository: Repository<Project>,
    private readonly tagsService: TagsService,

    private readonly paginationProvider: PaginationProvider,

    private readonly createProjectsService: CreateProjectsService,
  ) {}

  public async findAll(
    projectQuery: GetProjectsDto,
  ): Promise<Paginated<Project>> {
    const allProjects = await this.paginationProvider.paginateQuery(
      projectQuery,
      this.projectsRepository,
    );
    if (!allProjects) {
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
    return allProjects;
  }

  public async findOne(getProjectsParamDto: GetProjectsParamDto) {
    let project: Project | null;
    try {
      project = await this.projectsRepository.findOne({
        where: { id: getProjectsParamDto.id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!project) {
      {
        throw new BadRequestException('The post id does not exist');
      }
    }
    return project;
  }
  public async createProject(
    createProjectDto: CreateProjectDto,
    activeUser: ActiveUserData,
  ) {
    return await this.createProjectsService.createProject(
      createProjectDto,
      activeUser,
    );
  }

  public async updateProject(patchProjectDto: PatchProjectDto) {
    let tags: Tag[];
    let project: Project | null;
    try {
      tags = await this.tagsService.findMultipleTags(patchProjectDto.tags);
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
      !patchProjectDto?.tags ||
      tags.length !== patchProjectDto.tags.length
    ) {
      throw new BadRequestException(
        'Please check your tag Uds and ensure they are correct',
      );
    }
    try {
      project = await this.projectsRepository.findOne({
        where: { id: patchProjectDto.id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!project) {
      throw new BadRequestException(
        'The project does not exists in the database',
      );
    }
    const newProject = {
      ...patchProjectDto,
      tags: tags,
    };
    let updateProject = this.projectsRepository.merge(project, newProject);
    try {
      updateProject = await this.projectsRepository.save(updateProject);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return updateProject;
  }
  public async deleteProject(param: GetProjectsParamDto) {
    const projectId = param.id;
    await this.projectsRepository.delete(projectId);
    return { deleted: true, projectId };
  }
}
