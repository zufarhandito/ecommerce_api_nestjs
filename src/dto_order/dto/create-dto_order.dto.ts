import {
  IsEmpty,
  IsNumber,
  IsArray,
  IsString,
  IsNotEmpty,
  ValidateNested,
} from 'class-validator';

class Objs {}

export class CreateDtoOrderDto {
  // @IsNotEmpty()
  // @IsNumber()
  user_id: number;

  // @IsNotEmpty()
  // @IsNumber()
  product_id: number;

  // @IsNotEmpty()
  // @IsNumber()
  quantity: number;

  // @IsNotEmpty()
  // @IsNumber()
  price: number;
}
