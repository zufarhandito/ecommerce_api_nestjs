import { Module } from '@nestjs/common';
import { DtoProductService } from './dto_product.service';
import { DtoProductController } from './dto_product.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { products } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([products])],
  controllers: [DtoProductController],
  providers: [DtoProductService],
})
export class DtoProductModule {}
