import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';

import { PrismaModule } from './prisma/prisma.module';
import { AuthModule } from './auth/auth.module';
import { JwtAuthGuard } from './auth/guards/jwt.guard';
import { RolePermissionModule } from './role-permission/role-permission.module';
import { EventModule } from './event/event.module';
import { VenueAddressModule } from './venue-address/venue-address.module';
import { ChatModule } from './chat/chat.module';

@Module({
  imports: [
    PrismaModule,
    AuthModule,
    RolePermissionModule,
    EventModule,
    VenueAddressModule,
    ChatModule,
  ],
  providers: [{ provide: APP_GUARD, useClass: JwtAuthGuard }],
})
export class AppModule {}
