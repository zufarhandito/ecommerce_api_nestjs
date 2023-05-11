import { IsNotEmpty, IsString } from 'class-validator';

export class CreateDtoCustomerDto {
  @IsNotEmpty()
  @IsString()
  firstname: string;

  @IsNotEmpty()
  @IsString()
  lastname: string;
}
