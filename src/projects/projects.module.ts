import { Module } from '@nestjs/common';
import { ProjectsService } from './providers/projects.service';
import { ProjectsController } from './projects.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Project } from './projects.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateProjectsService } from './providers/create-project.service';

@Module({
  controllers: [ProjectsController],
  providers: [ProjectsService, CreateProjectsService],
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Project]),
  ],
})
export class ProjectsModule {}
