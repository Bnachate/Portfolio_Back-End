import { Controller, Query } from '@nestjs/common';
import { ExperiencesService } from './providers/experiences.service';
import { Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
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
  public getExperiences(@Query() experienceQuery: GetExperiencesDto) {
    return this.experiencesService.findAll(experienceQuery);
  }

  @Get('/:id')
  public getExperience(@Param() param: GetExperiencesParamDto) {
    return this.experiencesService.findOne(param);
  }

  @ApiOperation({
    summary: 'Creates a experience',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response if you experience is created successfully',
  })
  @Post()
  public createExperiences(
    @Body() createExperienceDto: CreateExperienceDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.experiencesService.createExperience(
      createExperienceDto,
      activeUser,
    );
  }

  @ApiOperation({
    summary: 'Updates an existing blog experience',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if you experience is updated successfully',
  })
  @Patch()
  public updateExperience(@Body() patchExperienceDto: PatchExperienceDto) {
    return this.experiencesService.updateExperience(patchExperienceDto);
  }

  @ApiOperation({
    summary: 'Delete a user registered on the application',
  })
  @ApiResponse({
    status: 200,
    description: 'Users deleted Successfully based on the query',
  })
  @ApiParam({
    name: 'id',
    description: 'Delete user with a specific id',
    example: '1234',
    required: true,
  })
  @Delete('/:id')
  public deleteUser(
    // @Param() getUserParamDto: GetUsersParamDto,
    @Param() param: GetExperiencesParamDto,
  ) {
    return this.experiencesService.deleteExperience(param);
  }
}
