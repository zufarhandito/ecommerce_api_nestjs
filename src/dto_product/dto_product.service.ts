import { Injectable } from '@nestjs/common';
import { CreateDtoProductDto } from './dto/create-dto_product.dto';
import { UpdateDtoProductDto } from './dto/update-dto_product.dto';
import { product_categories, products } from 'models';
import * as fs from 'fs';

@Injectable()
export class DtoProductService {
  async create(body: CreateDtoProductDto, file?: Express.Multer.File) {
    // let backupFile = '';
    try {
      // if (!body.name) throw new Error('nama barang kosong');
      // if (!body.description) throw new Error('deskripsi barang kosong');
      // if (!body.category_id) throw new Error('kategori barang kosong');
      // if (!body.price) throw new Error('harga barang kosong');

      let imageFile = file.filename;
      if(!file){
        imageFile='product.png'
      }
      const data = await products.create({
        name: body.name,
        description: body.description,
        category_id: body.category_id,
        price: body.price,
        image: imageFile,
      });
      return {
        status: 201,
        message: 'Produk berhasil ditambahkan',
        data: data
      }
    } catch (error) {
      // fs.unlinkSync('public/uploads/' + backupFile);
      return error.message;
    }
  }

  async findAll() {
    try {
      const data = await products.findAll({
        include: {model:product_categories}
      });
      if (!data) throw new Error('Data tidak ditemukan');

      return data;
    } catch (error) {
      return error.message;
    }
  }

  async findOne(id: number) {
    try {
      const data = await products.findByPk(id);
      if (!data) throw new Error('Data tidak ditemukan');
      return data;
    } catch (error) {
      return error.message;
    }
  }

  async update(
    id: number,
    body: UpdateDtoProductDto,
    file: Express.Multer.File,
  ) {
    try {
      const data = await products.findByPk(id);
      if (!data) throw new Error('Data tidak ditemukan');

      let setImage = data.image;

      if (file) {
        fs.unlinkSync('public/uploads/' + data.image);
        setImage = file.filename;
      }

      const data2 = await products.update(
        {
          name: body.name,
          description: body.description,
          category_id: body.category_id,
          price: body.price,
          image: setImage,
        },
        {
          where: {
            id: id,
          },
          returning: true,
        },
      );
      return {
        status: 200,
        message: 'Data berhasil di update',
        data: data2[1][0]
      };
    } catch (error) {
      return error.message;
    }
  }

  async remove(id: number) {
    try {
      const data = await this.findOne(id);
      if (!data) throw new Error('tidak ketemu');

      await products.destroy({
        where: {
          id: id,
        },
      });

      fs.unlinkSync('public/uploads/' + data.image);

      return 'sukses';
    } catch (error) {
      return error.message;
    }
  }
}
