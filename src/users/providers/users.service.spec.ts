import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { FindOneUserByEmailService } from './find-one-user-by-email.service';
import { CreateUserService } from './create-user.service';
import { UserCreateManyProvider } from './user-create-many.service';
import { DataSource } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from '../users.entity';
import { CreateUserDto } from '../dtos/create-user.dto';

describe('UsersService', () => {
  let service: UsersService;

  beforeEach(async () => {
    const mockCreateUserService: Partial<CreateUserService> = {
      createUser: (createUserDto: CreateUserDto) =>
        Promise.resolve({
          id: 12,
          firstName: createUserDto.firstName,
          lastName: createUserDto.lastName ?? '',
          email: createUserDto.email,
          password: createUserDto.password,
        }),
    };
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: DataSource,
          useValue: {},
        },
        {
          provide: getRepositoryToken(User),
          useValue: {},
        },
        {
          provide: FindOneUserByEmailService,
          useValue: {},
        },
        {
          provide: CreateUserService,
          useValue: mockCreateUserService,
        },
        {
          provide: UserCreateManyProvider,
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });
  it('UsersService should be defined"', () => {
    expect(service).toBeDefined();
  });
  describe('createUser', () => {
    const newUser: CreateUserDto = {
      firstName: 'Sanji',
      lastName: 'Vinsmoke',
      email: 'svinsmoke@gmail.com',
      password: '#Svtruc2356',
    };
    it('it should be defined', () => {
      expect(service.createUser(newUser)).toBeDefined();
    });
    it(' should call createUser on CreateUserService', async () => {
      const user = await service.createUser(newUser);
      expect(user.firstName).toEqual('Sanji');
    });
  });
});
