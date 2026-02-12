import {
  Controller,
  Query,
  Get,
  Post,
  Delete,
  Body,
  Param,
} from '@nestjs/common';
import { ContactsService } from './providers/contacts.service';
import { ApiOperation, ApiParam, ApiResponse, ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './dtos/create-contact.dto';
import { GetContactsParamDto } from './dtos/get-contacts-params.dto';
import { GetContactsDto } from './dtos/get-contacts.dto';
import { ActiveUser } from 'src/auth/decorator/active-user.decorator';
import type { ActiveUserData } from 'src/auth/interfaces/active-user-data.interface';

@Controller('contacts')
@ApiTags('contacts')
export class ContactsController {
  constructor(private readonly contactsService: ContactsService) {}

  @Get()
  @ApiOperation({ summary: 'Retrieve a list of all contacts' })
  @ApiResponse({
    status: 200,
    description: 'Contacts retrieved successfully.',
  })
  public getContacts(@Query() contactQuery: GetContactsDto) {
    return this.contactsService.findAll(contactQuery);
  }

  @Get('/:id')
  @ApiOperation({ summary: 'Get a specific contact by ID' })
  @ApiParam({
    name: 'id',
    description: 'The unique ID of the contact',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Contact found successfully.',
  })
  @ApiResponse({ status: 404, description: 'Contact not found.' })
  public getContact(@Param() param: GetContactsParamDto) {
    return this.contactsService.findOne(param);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new contact entry' })
  @ApiResponse({
    status: 201,
    description: 'The contact has been created successfully.',
  })
  @ApiResponse({ status: 400, description: 'Invalid input data.' })
  public createContacts(
    @Body() createContactDto: CreateContactDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.contactsService.createContact(createContactDto, activeUser);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a specific contact' })
  @ApiResponse({
    status: 200,
    description: 'Contact deleted successfully.',
  })
  @ApiResponse({ status: 404, description: 'Contact not found.' })
  @ApiParam({
    name: 'id',
    description: 'ID of the contact to delete',
    example: '123',
    required: true,
  })
  public deleteUser(@Param() param: GetContactsParamDto) {
    return this.contactsService.deleteContact(param);
  }
}
