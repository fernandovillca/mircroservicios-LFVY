import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  UseGuards,
} from '@nestjs/common';
import { EventsService } from './events.service';
import { TokenGuard } from '../common/guards/token.guard';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @UseGuards(TokenGuard)
  @Post()
  async create(@Body() body: any) {
    const { name, date, location, capacity, price } = body;
    if (
      !name ||
      !date ||
      !location ||
      capacity === undefined ||
      price === undefined
    ) {
      return { message: 'Todos los campos son obligatorios' };
    }
    return this.eventsService.create({ name, date, location, capacity, price });
  }

  @Get()
  @UseGuards(TokenGuard)
  async findAll() {
    return this.eventsService.findAll();
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.eventsService.findOne(id);
    return event;
  }

  @Put(':id')
  @UseGuards(TokenGuard)
  async update(@Param('id') id: string, @Body() body: any) {
    id = (id ?? '').trim();
    const updatePayload: any = {};
    if (body.name !== undefined) {
      updatePayload.name = body.name.trim();
    }
    if (body.date !== undefined) {
      const d = new Date(body.date);
      updatePayload.date = d;
    }
    if (body.location !== undefined) {
      updatePayload.location = body.location.trim();
    }
    if (body.capacity !== undefined) {
      const cap = Number(body.capacity);
      updatePayload.capacity = cap;
    }
    if (body.price !== undefined) {
      const p = Number(body.price);
      updatePayload.price = p;
    }
    return this.eventsService.update(id, updatePayload);
  }

  @Delete(':id')
  @UseGuards(TokenGuard)
  async remove(@Param('id') id: string) {
    return this.eventsService.remove(id);
  }
}
