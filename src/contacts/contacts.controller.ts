import { Controller, Query } from '@nestjs/common';
import { ContactsService } from './providers/contacts.service';
import { Get, Post, Delete, Body, Param } from '@nestjs/common';
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
  public getContacts(@Query() contactQuery: GetContactsDto) {
    return this.contactsService.findAll(contactQuery);
  }

  @Get('/:id')
  public getContact(@Param() param: GetContactsParamDto) {
    return this.contactsService.findOne(param);
  }

  @ApiOperation({
    summary: 'Creates a contact',
  })
  @ApiResponse({
    status: 201,
    description:
      'You get a 201 response if you contact is created successfully',
  })
  @Post()
  public createContacts(
    @Body() createContactDto: CreateContactDto,
    @ActiveUser() activeUser: ActiveUserData,
  ) {
    return this.contactsService.createContact(createContactDto, activeUser);
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
    @Param() param: GetContactsParamDto,
  ) {
    return this.contactsService.deleteContact(param);
  }
}
