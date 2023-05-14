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
      return {
        data: await orders.findAll({
          include: [{ model: order_details }],
        }),
      };
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const data = await orders.findOne({
        where: {
          id: id,
        },
        include: [{ model: order_details }],
      });
      if (!data) throw new Error('Data tidak ditemukan');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, body: UpdateDtoOrderDto[]): Promise<{message: string, logs: string[]}> {
    try {
      //Oke, pertama tama kita cari dulu produk apa saja yang ada di order x
      const previousOrder = await orders.findOne({
        where: { id: id },
        include: { model: order_details },
      });

      //akan kita lemparkan error jika data tidak ditemukan
      if (!previousOrder) throw new Error('Order tidak ditemukan');

      /**
       * Selanjutnya:
       * 1. cari produk apa saja yang di request
       * 2. cari produk apa saja yang ada di database
       */
      let requestedProduct:number[] = [];
      let storedProduct:number[] = [];
      let toBeAdded: number[] = [];
      let toBeDeleted: number[] = [];
      let toBeUpdated: number[] = [];
      
      let totalprice:number = 0;
      let totalproduct:number = 0;
      let user_id:number = 0;

      let message:string[] = [];

      for (let i in body) {
        user_id = body[i].user_id;
        totalproduct += body[i].quantity;
        totalprice += body[i].price * body[i].quantity;

        requestedProduct.push(body[i].product_id);
      }

      for (let i in previousOrder.order_details) {
        const pushed = previousOrder.order_details[i].product_id;
        storedProduct.push(pushed);

        if (requestedProduct.includes(pushed)) {
          toBeUpdated.push(pushed);
        }

        if (!requestedProduct.includes(pushed)) {
          toBeDeleted.push(pushed);
        }
      }

      for (let i in requestedProduct) {
        if (!storedProduct.includes(requestedProduct[i])) {
          toBeAdded.push(requestedProduct[i]);
        }
      }

      const newObj = {
        id: id,
        user_id: user_id,
        totalprice: totalprice,
        totalproduct: totalproduct,
      };

      if (toBeDeleted.length !== 0) {
        for (let i in toBeDeleted) {
          await order_details.destroy({
            where: {
              product_id: toBeDeleted[i],
              order_id: id,
            },
          });
        }
        message.push(`produk dengan id ${toBeDeleted} telah dihapus`);
      }

      if (toBeAdded.length !== 0) {
        body = body.filter((item) => toBeAdded.includes(item.product_id));

        const data = `${JSON.stringify(body)}`;
        const data2 = `[${JSON.stringify(newObj)}]`;

        await this.sequelize.query(
          `CALL updateorder_update('${data}','${data2}')`,
        );

        message.push(`menambahkan produk dengan id ${toBeAdded}`);
      }

      if(toBeUpdated.length !== 0){
        const data = `${JSON.stringify(body)}`;
        const data2 = `[${JSON.stringify(newObj)}]`;

        await this.sequelize.query(
          `CALL updateorder('${data}','${data2}')`,
        );

        message.push(`menyunting data dengan order id ${id} dan produk id ${toBeUpdated}`)
      }

      // return {
      //   requestedProduct: requestedProduct,
      //   storedProduct: storedProduct,
      //   hasil: {
      //     toBeAdded: toBeAdded,
      //     toBeDeleted: toBeDeleted,
      //     toBeUpdated: toBeUpdated
      //   }
      // }

      return {
        message: 'success',
        logs: message,
      };
    } catch (error) {
      return error.message;
    }
  }

  remove(id: number) {
    return `This action removes a #${id} dtoOrder`;
  }
}
