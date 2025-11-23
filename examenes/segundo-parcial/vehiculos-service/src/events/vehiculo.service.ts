import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Vehiculo } from './schemas/vehiculo.schema';

@Injectable()
export class VehiculoService {
  constructor(
    @InjectModel(Vehiculo.name) private vehiculoModel: Model<Vehiculo>,
  ) {}

  async create(data: any): Promise<Vehiculo> {
    const newVehiculo = new this.vehiculoModel(data);
    return newVehiculo.save();
  }

  async findAll(): Promise<Vehiculo[]> {
    return this.vehiculoModel.find().exec();
  }

  async findOne(id: string): Promise<any | null> {
    const vahiculo = await this.vehiculoModel.findById(id).exec();
    return vahiculo;
  }

  async update(id: string, updateData: any): Promise<any> {
    const updatedVehiculo = await this.vehiculoModel
      .findByIdAndUpdate(id, updateData, {
        new: true,
      })
      .exec();
    return updatedVehiculo;
  }

  async remove(id: string): Promise<Vehiculo | null> {
    return this.vehiculoModel.findByIdAndDelete(id).exec();
  }
}
