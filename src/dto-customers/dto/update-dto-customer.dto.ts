import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoCustomerDto } from './create-dto-customer.dto';

export class UpdateDtoCustomerDto extends PartialType(CreateDtoCustomerDto) {}
