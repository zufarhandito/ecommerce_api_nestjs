import { Module } from '@nestjs/common';
import { DtoOrderService } from './dto_order.service';
import { DtoOrderController } from './dto_order.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { orders } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([orders])],
  controllers: [DtoOrderController],
  providers: [DtoOrderService]
})
export class DtoOrderModule {}
