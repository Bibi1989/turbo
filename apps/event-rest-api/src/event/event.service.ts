import { Injectable } from '@nestjs/common';

import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class EventService {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createEventDto: CreateEventDto) {
    const data = {
      ...createEventDto,
      startDate: this.convertDate(createEventDto.startDate),
      endDate: this.convertDate(createEventDto.endDate),
      coverImage: JSON.stringify(createEventDto.coverImage),
      coverVideo: JSON.stringify(createEventDto.coverVideo ?? ''),
      coverAudio: JSON.stringify(createEventDto.coverAudio ?? ''),
      images: JSON.stringify(createEventDto.images ?? []),
    };

    const createdEvent = await this.prismaService.event.create({
      data,
      include: {
        Venue: true,
        Catering: true,
        Technical: true,
        User: {
          omit: {
            password: true,
          },
        },
      },
    });

    return createdEvent;
  }

  async findAll() {
    const events = await this.prismaService.event.findMany({
      include: {
        Venue: true,
        Catering: true,
        Technical: true,
        User: {
          omit: {
            password: true,
          },
        },
      },
    });

    return events;
  }

  findOne(id: string) {
    const event = this.prismaService.event.findUnique({
      where: { id },
      include: {
        Venue: true,
        Catering: true,
        Technical: true,
        User: {
          omit: {
            password: true,
          },
        },
      },
    });
    return event;
  }

  async update(id: string, updateEventDto: UpdateEventDto) {
    const data = {
      ...updateEventDto,
    };

    return await this.prismaService.event.update({
      where: { id },
      data,
      include: {
        Venue: true,
        Catering: true,
        Technical: true,
        User: {
          omit: {
            password: true,
          },
        },
      },
    });
  }

  async remove(id: string) {
    return await this.prismaService.event.delete({
      where: { id },
    });
  }

  async findAllByUserId(userId: string) {
    const events = await this.prismaService.event.findMany({
      where: { userId },
      include: {
        Venue: true,
        Catering: true,
        Technical: true,
        User: {
          omit: {
            password: true,
          },
        },
      },
    });

    return events;
  }

  convertDate(dateString: string) {
    const [day, month, year] = dateString.split('-').map(Number);
    const dateTime = new Date(year, month - 1, day); // Month is 0-indexed

    return dateTime.toISOString();
  }
}
