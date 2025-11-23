import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VehiculoService } from './vehiculo.service';
import { VehiculoController } from './vehiculo.controller';
import { Vehiculo, VehiculoSchema } from './schemas/vehiculo.schema';
import { TokenGuard } from '../common/guards/token.guard';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Vehiculo.name, schema: VehiculoSchema },
    ]),
  ],
  controllers: [VehiculoController],
  providers: [VehiculoService, TokenGuard],
})
export class VehiculoModule {}
