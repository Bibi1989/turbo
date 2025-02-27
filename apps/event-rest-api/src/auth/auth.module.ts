import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';

import { AuthService } from './auth.service';
import { LocalStrategy } from './strategy/local.strategy';
import { JwtAuthStrategy } from './strategy/jwt.strategy';
import { PrismaModule } from '../prisma/prisma.module';
import { AuthController } from './auth.controller';
import { RolePermissionModule } from '../role-permission/role-permission.module';

@Module({
  imports: [
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get('ACCESS_TOKEN_SECRET'),
        signOptions: { expiresIn: '120s' },
      }),
      inject: [ConfigService],
    }),
    PrismaModule,
    RolePermissionModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, ConfigService, LocalStrategy, JwtAuthStrategy],
  exports: [AuthService, LocalStrategy, JwtAuthStrategy],
})
export class AuthModule {}
