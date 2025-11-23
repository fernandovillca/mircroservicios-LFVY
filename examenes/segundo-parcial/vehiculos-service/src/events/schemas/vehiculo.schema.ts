import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Vehiculo extends Document {
  @Prop({ required: true })
  placa: string;

  @Prop({ required: true })
  tipo: string;

  @Prop({ required: true })
  capacidad: string;

  @Prop({ required: true })
  estado: string;
}

export const VehiculoSchema = SchemaFactory.createForClass(Vehiculo);
