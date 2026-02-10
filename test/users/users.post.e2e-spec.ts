import { INestApplication } from '@nestjs/common';
import request from 'supertest';
import { App } from 'supertest/types';
import { ConfigService } from '@nestjs/config';
import { dropDatabase } from 'test/helpers/drop-database.helper';
import { bootstrapNestApplication } from 'test/helpers/bootstrap-nest-application.helper';
import {
  completeUser,
  missingEmail,
  missingFirstName,
  missingPassword,
} from './users.post.e2e-spec.sample-data';

describe('[Users] @Post Endpoints', () => {
  let app: INestApplication<App>;
  let config: ConfigService;
  let httpServer: App;

  beforeEach(async () => {
    app = (await bootstrapNestApplication()) as INestApplication<App>;
    config = app.get(ConfigService);
    httpServer = app.getHttpServer();
  });
  afterEach(async () => {
    await dropDatabase(config);
    await app.close();
  });
  it('/users - Endpoint is public', () => {
    return request(httpServer).post('/users').send({}).expect(400);
  });
  it('/users - firstName is mandatory', () => {
    return request(httpServer)
      .post('/users')
      .send(missingFirstName)
      .expect(400);
  });
  it('/users - email is mandatory', () => {
    return request(httpServer).post('/users').send(missingEmail).expect(400);
  });
  it('/users - password is mandatory', () => {
    return request(httpServer).post('/users').send(missingPassword).expect(400);
  });
  it('/users - Valid request successfully creates user', () => {
    interface UserResponse {
      data: {
        firstName: string;
        lastName: string;
        email: string;
      };
    }
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }: { body: UserResponse }) => {
        expect(body.data).toBeDefined();
        expect(body.data.firstName).toBe(completeUser.firstName);
        expect(body.data.lastName).toBe(completeUser.lastName);
        expect(body.data.email).toBe(completeUser.email);
      });
  });
  it('/users - password is not returned in response', () => {
    interface UserResponse {
      data: {
        firstName: string;
        lastName: string;
        email: string;
        password: string;
      };
    }
    return request(httpServer)
      .post('/users')
      .send(completeUser)
      .expect(201)
      .then(({ body }: { body: UserResponse }) => {
        expect(body.data).toBeDefined();
        expect(body.data.password).toBeUndefined();
      });
  });
});
