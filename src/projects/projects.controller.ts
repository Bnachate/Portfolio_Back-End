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
import { ProjectsService } from './providers/projects.service';
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
  @ApiOperation({ summary: 'Fetch all projects' })
  @ApiResponse({
    status: 200,
    description: 'Projects retrieved successfully.',
  })
  public getProjects(@Query() projectQuery: GetProjectsDto) {
    return this.projectsService.findAll(projectQuery);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a project by its ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique identifier of the project',
    example: '1',
  })
  @ApiResponse({
    status: 200,
    description: 'Project retrieved successfully.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  public getProject(@Param() param: GetProjectsParamDto) {
    return this.projectsService.findOne(param);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new project' })
  @ApiResponse({
    status: 201,
    description: 'The project has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid project data.' })
  public createProjects(
    @Body() createProjectDto: CreateProjectDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.projectsService.createProject(createProjectDto, activeUser);
  }

  @Patch()
  @ApiOperation({ summary: 'Update an existing project' })
  @ApiResponse({
    status: 200,
    description: 'The project has been updated successfully.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  public updateProject(@Body() patchProjectDto: PatchProjectDto) {
    return this.projectsService.updateProject(patchProjectDto);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a specific project' })
  @ApiResponse({
    status: 200,
    description: 'Project deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Project not found.' })
  @ApiParam({
    name: 'id',
    description: 'The ID of the project to delete',
    example: '1',
    required: true,
  })
  public deleteUser(@Param() param: GetProjectsParamDto) {
    return this.projectsService.deleteProject(param);
  }
}
