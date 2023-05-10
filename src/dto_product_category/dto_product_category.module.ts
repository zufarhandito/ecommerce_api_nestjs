import { Module } from '@nestjs/common';
import { DtoProductCategoryService } from './dto_product_category.service';
import { DtoProductCategoryController } from './dto_product_category.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { product_categories } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([product_categories])],
  controllers: [DtoProductCategoryController],
  providers: [DtoProductCategoryService]
})
export class DtoProductCategoryModule {}
