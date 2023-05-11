import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDtoProductCategoryDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  description: string;
}
