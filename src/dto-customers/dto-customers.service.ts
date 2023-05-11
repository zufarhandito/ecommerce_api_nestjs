import { Injectable } from '@nestjs/common';
import { CreateDtoCustomerDto } from './dto/create-dto-customer.dto';
import { UpdateDtoCustomerDto } from './dto/update-dto-customer.dto';
import { customers } from 'models';
import { users } from 'models';

@Injectable()
export class DtoCustomersService {
  async create(body: CreateDtoCustomerDto) {
    return 'Customers can only be created when a user account is created';
  }

  async findAll() {
    try {
      const data = await customers.findAll();
      if (!data) throw new Error('Data tidak ada');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const data = await customers.findByPk(id);
      if (!data) throw new Error('Data tidak ada');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, body: UpdateDtoCustomerDto) {
    try {
      const data = await customers.update(
        {
          firstname: body.firstname,
          lastname: body.lastname,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        },
      );

      if (data[1].length === 0) throw new Error('Gagal di update! cek id');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: number) {
    try {
      const data = await customers.findByPk(id);
      if (!data) throw new Error('Data tidak ditemukan');

      await customers.destroy({
        where: {
          id: id,
        },
      });

      await users.destroy({
        where: {
          id: data.user_id,
        },
      });
    } catch (error) {
      return error.message;
    }
  }
}
