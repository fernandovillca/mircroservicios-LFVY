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
import { VehiculoService } from './vehiculo.service';
import { TokenGuard } from '../common/guards/token.guard';

@Controller('vehiculo')
export class VehiculoController {
  constructor(private readonly vehiculoService: VehiculoService) {}

  @UseGuards(TokenGuard)
  @Post()
  async create(@Body() body: any) {
    const { placa, tipo, capacidad, estado } = body;
    if (!placa || !tipo || !capacidad || !estado) {
      return { message: 'Todos los campos son obligatorios' };
    }
    return this.vehiculoService.create({ placa, tipo, capacidad, estado });
  }

  @UseGuards(TokenGuard)
  @Get()
  async findAll() {
    return this.vehiculoService.findAll();
  }

  @UseGuards(TokenGuard)
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const event = await this.vehiculoService.findOne(id);
    return event;
  }

  @UseGuards(TokenGuard)
  @Put(':id')
  async update(@Param('id') id: string, @Body() body: any) {
    id = (id ?? '').trim();
    const updatePayload: any = {};
    if (body.placa !== undefined) {
      updatePayload.placa = body.placa.trim();
    }
    if (body.tipo !== undefined) {
      updatePayload.tipo = body.tipo.trim();
    }
    if (body.capacidad !== undefined) {
      updatePayload.capacidad = body.capacidad.trim();
    }
    if (body.estado !== undefined) {
      updatePayload.estado = body.estado.trim();
    }

    return this.vehiculoService.update(id, updatePayload);
  }

  @UseGuards(TokenGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.vehiculoService.remove(id);
  }
}
