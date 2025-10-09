import { IsDateString, IsInt, IsNotEmpty, IsNumber, IsString, Min } from 'class-validator';

export class CreateEventDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsDateString()
  date: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsInt()
  @Min(0)
  capacity: number;

  @IsNumber()
  @Min(0)
  price: number;
}
