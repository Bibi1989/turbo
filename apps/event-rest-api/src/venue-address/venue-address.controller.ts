import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  ParseUUIDPipe,
} from '@nestjs/common';

import { VenueAddressService } from './venue-address.service';
import { CreateVenueDto } from './dto/create-venue.dto';
import { UpdateVenueDto } from './dto/update-venue.dto';

@Controller()
export class VenueAddressController {
  constructor(private readonly venueService: VenueAddressService) {}

  @Post('venue/post')
  create(@Body() createVenueDto: CreateVenueDto) {
    return this.venueService.create(createVenueDto);
  }

  @Get('venue/get')
  findAllVenues() {
    return this.venueService.findAllVenues();
  }

  @Get('address/get')
  findAllAddresses() {
    return this.venueService.findAllAddresses();
  }

  @Get('venue/get/:id')
  findOneVenue(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.venueService.findOneVenue(id);
  }

  @Get('address/get/:id')
  findOneAddress(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.venueService.findOneAddress(id);
  }

  @Patch(':id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateVenueDto: UpdateVenueDto,
  ) {
    return this.venueService.update(id, updateVenueDto);
  }

  @Delete(':id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.venueService.remove(id);
  }
}
