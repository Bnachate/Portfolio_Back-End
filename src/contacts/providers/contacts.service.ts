import {
  Injectable,
  RequestTimeoutException,
  BadRequestException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { GetContactsParamDto } from 'src/contacts/dtos/get-contacts-params.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Contact } from '../contacts.entity';
import { Repository } from 'typeorm';
import { GetContactsDto } from '../dtos/get-contacts.dto';
import { PaginationProvider } from 'src/common/pagination/providers/pagination.service';
import { Paginated } from 'src/common/pagination/interfaces/paginated.interface';
import { CreateContactsService } from './create-contact.service';
import { CreateContactDto } from '../dtos/create-contact.dto';
import { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Injectable()
export class ContactsService {
  constructor(
    @InjectRepository(Contact)
    private contactsRepository: Repository<Contact>,

    private readonly paginationProvider: PaginationProvider,

    private readonly createContactsService: CreateContactsService,
  ) {}

  public async findAll(
    contactQuery: GetContactsDto,
  ): Promise<Paginated<Contact>> {
    const allContacts = await this.paginationProvider.paginateQuery(
      contactQuery,
      this.contactsRepository,
    );
    if (!allContacts) {
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
    return allContacts;
  }

  public async findOne(getContactsParamDto: GetContactsParamDto) {
    let contact: Contact | null;
    try {
      contact = await this.contactsRepository.findOne({
        where: { id: getContactsParamDto.id },
      });
    } catch {
      throw new RequestTimeoutException(
        'Unable to process your request at the moment. Please try later',
        {
          description: 'Error connecting to the database',
        },
      );
    }
    if (!contact) {
      {
        throw new BadRequestException('The post id does not exist');
      }
    }
    return contact;
  }
  public async createContact(
    createContactDto: CreateContactDto,
    activeUser: ActiveUserData,
  ) {
    return await this.createContactsService.createContact(
      createContactDto,
      activeUser,
    );
  }

  public async deleteContact(param: GetContactsParamDto) {
    const contactId = param.id;
    await this.contactsRepository.delete(contactId);
    return { deleted: true, contactId };
  }
}
