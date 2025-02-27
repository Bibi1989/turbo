import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Request,
  ParseUUIDPipe,
} from '@nestjs/common';
import { EventService } from './event.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Controller('event')
export class EventController {
  constructor(private readonly eventService: EventService) {}

  @Post('/post')
  create(@Body() createEventDto: CreateEventDto, @Request() req) {
    return this.eventService.create({ ...createEventDto, userId: req.user.id });
  }

  @Get('/get')
  findAll() {
    return this.eventService.findAll();
  }

  @Get('/user')
  findUserEvents(@Request() req) {
    return this.eventService.findAllByUserId(req.user.id);
  }

  @Get('/get/:id')
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.eventService.findOne(id);
  }

  @Patch('/put/:id')
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateEventDto: UpdateEventDto,
  ) {
    return this.eventService.update(id, updateEventDto);
  }

  @Delete('/delete/:id')
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.eventService.remove(id);
  }
}
