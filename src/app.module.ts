import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ResultModule } from './result/result.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { UserClientModule } from './user-client/user-client.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { JwtAuthGuard } from './auth/guards/jwt-auth.guard';
import { RolesGuard } from './auth/guards/roles.guard';
import { JwtStrategy } from './auth/strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { MessagingModule } from './messaging/messaging.module';
import Joi from 'joi';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      expandVariables: true,
      validationSchema: Joi.object({
        DB_HOST: Joi.string().required(),
        DB_HOST_FOR_DATA_SOURCE: Joi.string().required(),
        DB_PORT: Joi.number().default(5432),
        DB_PORT_FOR_DATA_SOURCE: Joi.number().default(5433),
        DB_USERNAME: Joi.string().required(),
        DB_NAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        INTERNAL_API_KEY: Joi.string().required(),
        USER_SERVICE_URL: Joi.string().required(),
        RABBITMQ_URL: Joi.string().required(),
        RESULT_QUEUE: Joi.string().required(),
        PORT: Joi.number().default(3002),
        JWT_SECRET: Joi.string().required(),
        JWT_EXPIRY: Joi.string().required(),
        REFRESH_TOKEN_EXPIRY: Joi.string().required(),
      }),
    }),
    ResultModule,
    UserClientModule,
    AuthModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT!),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false,
    }),
    MessagingModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    { provide: APP_GUARD, useClass: JwtAuthGuard },
    { provide: APP_GUARD, useClass: RolesGuard },
    JwtStrategy,
  ],
})
export class AppModule {
  /*
  constructor(private dataSource: DataSource) {
    console.log(`data source ${dataSource.driver.database}`);
    console.log(
      `JWT_SECRET ${process.env.JWT_SECRET} ${typeof process.env.JWT_SECRET}`,
    );
    console.log(
      `JWT_EXPIRY ${process.env.JWT_EXPIRY} ${typeof process.env.JWT_EXPIRY}`,
    );
    console.log(
      `REFRESH_TOKEN_EXPIRY ${process.env.REFRESH_TOKEN_EXPIRY} ${typeof process.env.REFRESH_TOKEN_EXPIRY}`,
    );
    console.log(`DB_HOST ${process.env.DB_HOST} ${typeof process.env.DB_HOST}`);
    console.log(`DB_PORT ${process.env.DB_PORT} ${typeof process.env.DB_PORT}`);
    console.log(
      `INTERNAL_API_KEY ${process.env.INTERNAL_API_KEY} ${typeof process.env.INTERNAL_API_KEY}`,
    );
    console.log(`DB_NAME ${process.env.DB_NAME} ${typeof process.env.DB_NAME}`);
    console.log(
      `DB_PASSWORD ${process.env.DB_PASSWORD} ${typeof process.env.DB_PASSWORD}`,
    );
    console.log(`PORT ${process.env.PORT} ${typeof process.env.PORT}`);
  }
  */
}
