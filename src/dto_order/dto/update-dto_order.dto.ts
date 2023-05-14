import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoOrderDto } from './create-dto_order.dto';

export class UpdateDtoOrderDto extends PartialType(CreateDtoOrderDto) {
  // order_details?: any
}
