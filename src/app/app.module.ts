import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { ProjectsModule } from '../projects/projects.module';
import { ExperiencesModule } from '../experiences/experiences.module';
import { ContactsModule } from 'src/contacts/contacts.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TagsModule } from 'src/tags/tags.module';
import appConfig from 'src/config/app.config';
import databaseConfig from 'src/config/database.config';
import environmentValidation from 'src/config/environment.validation';
import jwtConfig from 'src/auth/config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { APP_GUARD, APP_INTERCEPTOR } from '@nestjs/core';
import { AccessTokenGuard } from 'src/auth/guards/access-token/access-token.guard';
import { AuthenticationGuard } from 'src/auth/guards/authentication/authentication.guard';
import { DataResponseInterceptor } from 'src/common/interceptors/data-response.interceptor';
import { MailModule } from 'src/mail/mail.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    ProjectsModule,
    ExperiencesModule,
    ContactsModule,
    TagsModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const config = {
          type: 'postgres' as const,
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.user'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.name'),
          autoLoadEntities: configService.get<boolean>(
            'database.autoLoadEntities',
          ),
          synchronize: configService.get<boolean>('database.synchronize'),
          // SSL configuration for production (Railway, Heroku, etc.)
          ssl:
            process.env.NODE_ENV === 'production'
              ? { rejectUnauthorized: false }
              : false,
          // Add logging to debug connection issues
          logging: process.env.NODE_ENV === 'production',
        };
        console.log('TypeORM connecting with config:', {
          ...config,
          password: '***', // Hide password in logs
        });
        return config;
      },
    }),
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthenticationGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: DataResponseInterceptor,
    },
    AccessTokenGuard,
  ],
})
export class AppModule {}
