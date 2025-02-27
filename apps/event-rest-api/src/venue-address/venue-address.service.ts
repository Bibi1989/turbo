import { Injectable } from '@nestjs/common';

import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class VenueAddressService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createVenueDto: CreateVenueDto) {
    const address = await this.prismaService.address.create({
      data: {
        streetName: createVenueDto.streetName,
        houseNumber: createVenueDto.houseNumber,
        city: createVenueDto.city,
        region: createVenueDto.city,
        zipCode: createVenueDto.zipCode,
        country: createVenueDto.country,
      },
    });

    return await this.prismaService.venue.create({
      data: {
        name: createVenueDto.name,
        address: createVenueDto.address,
        addressId: address.id,
      },
    });
  }

  async findAllVenues() {
    const venues = await this.prismaService.venue.findMany({
      include: {
        Address: true,
      },
    });

    return venues;
  }

  async findAllAddresses() {
    return await this.prismaService.address.findMany();
  }

  async findOneVenue(id: string) {
    return await this.prismaService.venue.findUnique({
      where: { id },
      include: {
        Address: true,
      },
    });
  }

  async findOneAddress(id: string) {
    return await this.prismaService.address.findUnique({
      where: { id },
    });
  }

  update(id: string, updateVenueDto: UpdateVenueDto) {
    return `This action updates a #${id} venue`;
  }

  remove(id: string) {
    return `This action removes a #${id} venue`;
  }
}
