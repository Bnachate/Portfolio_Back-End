import {
  Controller,
  Query,
  Get,
  Post,
  Patch,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ExperiencesService } from './providers/experiences.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateExperienceDto } from './dtos/create-experience.dto';
import { PatchExperienceDto } from './dtos/patch-experience.dto';
import { GetExperiencesParamDto } from './dtos/get-experiences-params.dto';
import { GetExperiencesDto } from './dtos/get-experiences.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('experiences')
@ApiTags('experiences')
export class ExperiencesController {
  constructor(private readonly experiencesService: ExperiencesService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve all experiences' })
  @ApiResponse({
    status: 200,
    description: 'List of experiences retrieved successfully.',
  })
  public getExperiences(@Query() experienceQuery: GetExperiencesDto) {
    return this.experiencesService.findAll(experienceQuery);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a specific experience by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the experience',
    example: 1,
  })
  @ApiResponse({ status: 200, description: 'Experience found successfully.' })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  public getExperience(@Param() param: GetExperiencesParamDto) {
    return this.experiencesService.findOne(param);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new experience' })
  @ApiResponse({
    status: 201,
    description: 'The experience has been successfully created.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  @ApiResponse({ status: 401, description: 'Unauthorized.' })
  public createExperiences(
    @Body() createExperienceDto: CreateExperienceDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.experiencesService.createExperience(
      createExperienceDto,
      activeUser,
    );
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing experience' })
  @ApiResponse({
    status: 200,
    description: 'The experience has been successfully updated.',
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  public updateExperience(@Body() patchExperienceDto: PatchExperienceDto) {
    return this.experiencesService.updateExperience(patchExperienceDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete an experience' })
  @ApiResponse({
    status: 200,
    description: 'Experience deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Experience not found.' })
  @ApiParam({
    name: 'id',
    description: 'ID of the experience to delete',
    example: '1',
    required: true,
  })
  public deleteUser(@Param() param: GetExperiencesParamDto) {
    return this.experiencesService.deleteExperience(param);
  }
}
