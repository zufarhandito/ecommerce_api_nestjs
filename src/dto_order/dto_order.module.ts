import { Module } from '@nestjs/common';
import { DtoOrderService } from './dto_order.service';
import { DtoOrderController } from './dto_order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { order_details, orders } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([orders, order_details])],
  controllers: [DtoOrderController],
  providers: [DtoOrderService],
})
export class DtoOrderModule {}
