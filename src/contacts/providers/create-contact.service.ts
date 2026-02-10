import { Body, Injectable, RequestTimeoutException } from '@nestjs/common';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { User } from 'src/users/users.entity';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../contacts.entity';
import { Repository } from 'typeorm';
import { UsersService } from 'src/users/providers/users.service';
import { TagsService } from 'src/tags/providers/tags.service';

@Injectable()
export class CreateContactsService {
  constructor(
    private readonly usersService: UsersService,
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,
    private readonly tagsService: TagsService,
  ) {}
  public async createContact(
    @Body() createContactDto: CreateContactDto,
    activeUser: ActiveUserData,
  ) {
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
    const contact = this.contactsRepository.create({
      ...createContactDto,
      owner: owner,
    });
    let newContact: Contact;
    try {
      newContact = await this.contactsRepository.save(contact);
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    return newContact;
  }
}
