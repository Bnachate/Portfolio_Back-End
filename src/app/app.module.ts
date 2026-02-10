import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { PostsModule } from '../posts/posts.module';
import { AuthModule } from 'src/auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MetaOptionsModule } from 'src/meta-options/meta-options.module';
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
import { MailModule } from '../mail/mail.module';
// import { User } from 'src/users/users.entity';
// import { Post } from 'src/posts/posts.entity';
// import { Tag } from 'src/tags/tags.entity';
// import { MetaOption } from 'src/meta-options/meta-options.entity';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
    UsersModule,
    PostsModule,
    TagsModule,
    MetaOptionsModule,
    AuthModule,
    MailModule,
    ConfigModule.forRoot({
      isGlobal: true,
      // envFilePath: ['.env.development'],
      envFilePath: !ENV ? '.env' : `.env.${ENV}`,
      load: [appConfig, databaseConfig],
      validationSchema: environmentValidation,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.user'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.name'),
        // entities: [User, Post, Tag, MetaOption],
        autoLoadEntities: configService.get<boolean>(
          'database.autoLoadEntities',
        ),
        synchronize: configService.get<boolean>('database.synchronize'),
      }),
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
