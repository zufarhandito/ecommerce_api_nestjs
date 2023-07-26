import { IsNotEmpty, IsString, IsInt, IsNumber } from 'class-validator';

export class CreateDtoProductDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;

  @IsNotEmpty()
  // @IsNumber()
  category_id: any;

  @IsNotEmpty()
  // @IsNumber()
  price: any;

  image?: any;

  @IsNotEmpty()
  weight: string;
}
