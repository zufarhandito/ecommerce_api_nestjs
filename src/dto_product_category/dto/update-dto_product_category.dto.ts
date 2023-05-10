import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoProductCategoryDto } from './create-dto_product_category.dto';

export class UpdateDtoProductCategoryDto extends PartialType(CreateDtoProductCategoryDto) {
    
}
