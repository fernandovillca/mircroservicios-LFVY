import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Event } from './schemas/event.schema';

@Injectable()
export class EventsService {
  constructor(@InjectModel(Event.name) private eventModel: Model<Event>) {}

  async create(data: any): Promise<Event> {
    const newEvent = new this.eventModel(data);
    return newEvent.save();
  }

  async findAll(): Promise<Event[]> {
    return this.eventModel.find().exec();
  }

  async findOne(id: string): Promise<any | null> {
    const event = await this.eventModel.findById(id).exec(); 
    return event;
  }

  async update(id: string, updateData: any): Promise<any> {
    const updatedEvent = await this.eventModel.findByIdAndUpdate(
        id, 
        updateData, 
        { 
            new: true, 
        }
    ).exec();
    return updatedEvent;
  }

  async remove(id: string): Promise<Event | null> {
  return this.eventModel.findByIdAndDelete(id).exec();
  }

}
