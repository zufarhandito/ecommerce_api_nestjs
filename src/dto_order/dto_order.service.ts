import { Injectable } from '@nestjs/common';
import { CreateDtoOrderDto } from './dto/create-dto_order.dto';
import { UpdateDtoOrderDto } from './dto/update-dto_order.dto';
import { Sequelize } from 'sequelize-typescript';
import { order_details, orders, users } from 'models';

@Injectable()
export class DtoOrderService {
  constructor(private readonly sequelize: Sequelize) {}

  async create(body: CreateDtoOrderDto) {
    try {
      let totalprice = 0;
      let totalproduct = 0;
      let user_id = 0;

      for (let i in body) {
        user_id = body[i].user_id;
        totalproduct += body[i].quantity;
        totalprice += body[i].price * body[i].quantity;
      }

      const newObj = {
        totalprice: totalprice,
        totalproduct: totalproduct,
        user_id: user_id,
      };

      const data = `[${JSON.stringify(newObj)}]`;
      const data2 = `${JSON.stringify(body)}`;

      const result = await this.sequelize.query(
        `CALL InsertOrderDetail('${data}','${data2}')`,
      );

      return result;
    } catch (error) {
      return error.message;
    }
  }

  async findAll() {
    try {
      return 'dari users aja';
    } catch (error) {
      return error.message;
    }
  }

  findOne(id: number) {
    return `This action returns a #${id} dtoOrder`;
  }

  update(id: number, updateDtoOrderDto: UpdateDtoOrderDto) {
    return `This action updates a #${id} dtoOrder`;
  }

  remove(id: number) {
    return `This action removes a #${id} dtoOrder`;
  }
}
