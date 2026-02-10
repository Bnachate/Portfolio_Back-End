import {
  Body,
  Injectable,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { UsersService } from 'src/users/providers/users.service';
import { GetExperiencesParamDto } from 'src/experiences/dtos/get-experiences-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Experience } from '../experiences.entity';
import { Repository } from 'typeorm';
import { PatchExperienceDto } from '../dtos/patch-experience.dto';
import { Tag } from 'src/tags/tags.entity';
import { TagsService } from 'src/tags/providers/tags.service';
import { GetExperiencesDto } from '../dtos/get-experiences.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateExperiencesService } from './create-experience.service';
import { CreateExperienceDto } from '../dtos/create-experience.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
// import { MetaOption } from 'src/meta-options/meta-options.entity';

@Injectable()
export class ExperiencesService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Experience)
    private experiencesRepository: Repository<Experience>,
    // @InjectRepository(MetaOption)
    // private metaOptionRepository: Repository<MetaOption>,
    private readonly tagsService: TagsService,

    private readonly paginationProvider: PaginationProvider,

    private readonly createExperiencesService: CreateExperiencesService,
  ) {}

  public async findAll(
    experienceQuery: GetExperiencesDto,
  ): Promise<Paginated<Experience>> {
    const allExperiences = await this.paginationProvider.paginateQuery(
      experienceQuery,
      this.experiencesRepository,
    );
    if (!allExperiences) {
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
    return allExperiences;
  }

  public async findOne(getExperiencesParamDto: GetExperiencesParamDto) {
    let experience: Experience | null;
    try {
      experience = await this.experiencesRepository.findOne({
        where: { id: getExperiencesParamDto.id },
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
    if (!experience) {
      {
        throw new BadRequestException('The post id does not exist');
      }
    }
    return experience;
  }
  public async createExperience(
    createExperienceDto: CreateExperienceDto,
    activeUser: ActiveUserData,
  ) {
    return await this.createExperiencesService.createExperience(
      createExperienceDto,
      activeUser,
    );
  }

  public async updateExperience(patchExperienceDto: PatchExperienceDto) {
    let tags: Tag[];
    let experience: Experience | null;
    try {
      tags = await this.tagsService.findMultipleTags(patchExperienceDto.tags);
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
      !patchExperienceDto?.tags ||
      tags.length !== patchExperienceDto.tags.length
    ) {
      throw new BadRequestException(
        'Please check your tag Uds and ensure they are correct',
      );
    }
    try {
      experience = await this.experiencesRepository.findOne({
        where: { id: patchExperienceDto.id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!experience) {
      throw new BadRequestException(
        'The project does not exists in the database',
      );
    }
    const newExperience = {
      ...patchExperienceDto,
      tags: tags,
    };
    let updateExperience = this.experiencesRepository.merge(
      experience,
      newExperience,
    );
    try {
      updateExperience =
        await this.experiencesRepository.save(updateExperience);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return updateExperience;
  }
  public async deleteExperience(param: GetExperiencesParamDto) {
    const experienceId = param.id;
    await this.experiencesRepository.delete(experienceId);
    return { deleted: true, experienceId };
  }
}
