import { Module } from '@nestjs/common';

import { VenueAddressService } from './venue-address.service';
import { VenueAddressController } from './venue-address.controller';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [VenueAddressController],
  providers: [VenueAddressService, PrismaService],
  exports: [VenueAddressService],
})
export class VenueAddressModule {}
