import { Module } from '@nestjs/common';
import { ContactsService } from './providers/contacts.service';
import { ContactsController } from './contacts.controller';
import { UsersModule } from '../users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Contact } from './contacts.entity';
import { TagsModule } from 'src/tags/tags.module';
import { PaginationModule } from 'src/common/pagination/pagination.module';
import { CreateContactsService } from './providers/create-contact.service';

@Module({
  controllers: [ContactsController],
  providers: [ContactsService, CreateContactsService],
  imports: [
    UsersModule,
    TagsModule,
    PaginationModule,
    TypeOrmModule.forFeature([Contact]),
  ],
})
export class ContactsModule {}
