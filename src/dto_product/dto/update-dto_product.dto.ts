import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoProductDto } from './create-dto_product.dto';

export class UpdateDtoProductDto extends PartialType(CreateDtoProductDto) {}
