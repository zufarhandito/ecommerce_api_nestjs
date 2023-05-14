import { IsNotEmpty, IsString, IsInt } from 'class-validator';

export class CreateDtoProductDto {
  // @IsNotEmpty()
  // @IsString()
  name: string;

  // @IsNotEmpty()
  // @IsString()
  description: string;

  // @IsNotEmpty()
  // @IsInt()
  category_id: any;

  // @IsNotEmpty()
  // @IsInt()
  price: any;

  image: any;
}
