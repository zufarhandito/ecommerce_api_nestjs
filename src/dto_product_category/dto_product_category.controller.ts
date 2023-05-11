import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DtoProductCategoryService } from './dto_product_category.service';
import { CreateDtoProductCategoryDto } from './dto/create-dto_product_category.dto';
import { UpdateDtoProductCategoryDto } from './dto/update-dto_product_category.dto';

@Controller('dto-product-category')
export class DtoProductCategoryController {
  constructor(
    private readonly dtoProductCategoryService: DtoProductCategoryService,
  ) {}

  @Post()
  create(@Body() body: CreateDtoProductCategoryDto) {
    return this.dtoProductCategoryService.create(body);
  }

  @Get()
  findAll() {
    return this.dtoProductCategoryService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoProductCategoryService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDtoProductCategoryDto: UpdateDtoProductCategoryDto,
  ) {
    return this.dtoProductCategoryService.update(
      +id,
      updateDtoProductCategoryDto,
    );
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoProductCategoryService.remove(+id);
  }
}
