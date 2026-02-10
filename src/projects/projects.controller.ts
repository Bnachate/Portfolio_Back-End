import { Controller, Query } from '@nestjs/common';
import { ProjectsService } from './providers/projects.service';
import { Get, Post, Patch, Delete, Body, Param } from '@nestjs/common';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateProjectDto } from './dtos/create-project.dto';
import { PatchProjectDto } from './dtos/patch-project.dto';
import { GetProjectsParamDto } from './dtos/get-projects-params.dto';
import { GetProjectsDto } from './dtos/get-projects.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('projects')
@ApiTags('Projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) {}

  @Get()
  public getProjects(@Query() projectQuery: GetProjectsDto) {
    return this.projectsService.findAll(projectQuery);
  }

  @Get('/:id')
  public getProject(@Param() param: GetProjectsParamDto) {
    return this.projectsService.findOne(param);
  }

  @ApiOperation({
    summary: 'Creates a project',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response if you project is created successfully',
  })
  @Post()
  public createProjects(
    @Body() createProjectDto: CreateProjectDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.projectsService.createProject(createProjectDto, activeUser);
  }

  @ApiOperation({
    summary: 'Updates an existing blog project',
  })
  @ApiResponse({
    status: 200,
    description:
      'You get a 200 response if you project is updated successfully',
  })
  @Patch()
  public updateProject(@Body() patchProjectDto: PatchProjectDto) {
    return this.projectsService.updateProject(patchProjectDto);
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
    @Param() param: GetProjectsParamDto,
  ) {
    return this.projectsService.deleteProject(param);
  }
}
