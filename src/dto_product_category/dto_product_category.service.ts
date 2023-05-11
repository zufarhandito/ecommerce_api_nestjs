import { Injectable } from '@nestjs/common';
import { product_categories } from 'models';
import { CreateDtoProductCategoryDto } from './dto/create-dto_product_category.dto';
import { UpdateDtoProductCategoryDto } from './dto/update-dto_product_category.dto';

@Injectable()
export class DtoProductCategoryService {
  async create(body: CreateDtoProductCategoryDto): Promise<any> {
    try {
      const data = await product_categories.create(
        {
          name: body.name,
          description: body.description,
        },
        {
          returning: true,
        },
      );

      const result = {
        message: 'sukses',
        data: data,
      };
      return result;
    } catch (error) {
      return error.message;
    }
  }

  async findAll(): Promise<product_categories[]> {
    try {
      const data = await product_categories.findAll();
      if (!data) throw new Error('Data tidak ditemukan');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number): Promise<any> {
    try {
      const data = await product_categories.findByPk(id);
      if (!data) throw new Error('Data tidak ditemukan');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async update(id: number, body: UpdateDtoProductCategoryDto) {
    try {
      const data = await product_categories.update(
        {
          name: body.name,
          description: body.description,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        },
      );

      if (data[1].length === 0) throw new Error('Gagal update data! Cek id mu');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: number) {
    try {
      await product_categories.destroy({
        where: {
          id: id,
        },
      });
      return 'Data berhasil dihapus';
    } catch (error) {
      return error.message;
    }
  }
}
