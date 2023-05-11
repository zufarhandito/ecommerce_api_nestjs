import { Injectable } from '@nestjs/common';
import { CreateDtoUserDto } from './dto/create-dto_user.dto';
import { UpdateDtoUserDto } from './dto/update-dto_user.dto';
import { order_details, orders, product_categories, products, users } from 'models';
import { customers } from 'models';
import { Sequelize } from 'sequelize-typescript';
import * as bcrypt from 'bcrypt';

@Injectable()
export class DtoUserService {

  constructor(private readonly sequelize: Sequelize){}

  async create(dataBody: CreateDtoUserDto) {
    let data: any = '';
        let data2: any = '';
        try {
            let hashed = await bcrypt.hash(dataBody.password,10)
            
            data = await users.create({
                username: dataBody.username,
                password: hashed
            })

            data2 = await customers.create({
                user_id: data.id,
                firstname: dataBody.firstname,
                lastname: dataBody.lastname
            })

            return data

        } catch (error) {
            if(data){
                users.destroy({
                    where:{
                        id: data.id
                    }
                })
            }
            return error.message
        }
  }

  async createSP(dataBody:CreateDtoUserDto): Promise<any> {
    try {
      let hashed = await bcrypt.hash(dataBody.password,10)
      dataBody.password = hashed;

      const data = `[${JSON.stringify(dataBody)}]`;
      const result = await this.sequelize.query(`CALL InsertUserCustomer2('${data}')`)
      
      return result
  } catch (error) {
      return error.message
  }
  }

  async findAll(): Promise<any> {
    try {
      const data = await users.findAll({
        include: [
          {
            model: customers,
            attributes: ['id','firstname','lastname','createdat','updatedat']
          },
          {
            model: orders,
            attributes: ['id','totalproduct','totalprice','createdat','updatedat'],
            include: [
              {
                model: order_details,
                attributes: ['id','quantity','createdat','updatedat'],
                include: [
                  {
                    model: products,
                    attributes: ['id','name','description','price','image','createdat','updatedat'],
                    include: [
                      {
                        model: product_categories,
                        attributes: ['id','name','description','createdat','updatedat']
                      }
                    ]
                  }
                ]
              }
            ]
          }
        ]
      })

      // const data2 = await this.sequelize.query(`
      // select
      //   users.username,
      //   customers.firstname,
      //   customers.lastname,
      //   orders.totalproduct,
      //   orders.totalprice,
      //   order_details.quantity,
      //   products.name,
      //   products.description,
      //   products.price,
      //   products.image
      // from 
      //   users
      // join customers on customers.user_id = users.id
      // join orders on orders.user_id = users.id
      // join order_details on order_details.order_id = orders.id
      // join products on products.id = order_details.product_id
      // `)
      return data
    } catch (error) {
        return error.message
    }
  }

  async findOne(id: number) {
    try {
        const data = await users.findByPk(id)
        return data
    } catch (error) {
        return error.message
    }
  }

  async update(id: number, updateDtoUserDto: UpdateDtoUserDto): Promise<any> {
    try {
      const data = await users.findByPk(id);
      if(!data) throw new Error("Id tidak ditemukan") 

      let password: string = data.password;

      let passHash: any = await bcrypt.hash(updateDtoUserDto.password,10);

      if(updateDtoUserDto.password){
        password = passHash;
      }
      
      const data2 = await users.update({
        username: updateDtoUserDto.username,
        password: password
      },{
        where: {
          id: id
        },
        returning: true
      })

      return data2
    } catch (error) {
      return error.message
    }
  }

  async remove(id: number) {
    try {
      const data = await users.findByPk(id);
      if(!data) throw new Error("Data tidak ada")
      
      await this.sequelize.query(`delete from users where id = ${id}`);

      return 'sukses menghapus'
    } catch (error) {
      return error.message
    }
  }


}
