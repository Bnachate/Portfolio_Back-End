import { Module } from '@nestjs/common';
import { ExperiencesService } from './providers/experiences.service';
import { ExperiencesController } from './experiences.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Experience } from './experiences.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateExperiencesService } from './providers/create-experience.service';

@Module({
  controllers: [ExperiencesController],
  providers: [ExperiencesService, CreateExperiencesService],
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Experience]),
  ],
})
export class ExperiencesModule {}
