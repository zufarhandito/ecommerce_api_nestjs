import { Module } from '@nestjs/common';
import { DtoUserService } from './dto_user.service';
import { DtoUserController } from './dto_user.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import {
  customers,
  order_details,
  orders,
  product_categories,
  products,
  users,
} from 'models';

@Module({
  imports: [
    SequelizeModule.forFeature([
      users,
      orders,
      order_details,
      products,
      customers,
      product_categories,
    ]),
  ],
  controllers: [DtoUserController],
  providers: [DtoUserService],
})
export class DtoUserModule {}
