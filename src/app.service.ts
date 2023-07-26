import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { users } from 'models';
import { JwtService } from '@nestjs/jwt';
import { customers } from 'models';
import { Sequelize } from 'sequelize-typescript';

@Injectable()
export class AppService {
  constructor(
    private jwtService: JwtService,
    private readonly sequelize: Sequelize,
  ) {}

  async login(body: any): Promise<any> {
    try {
      // const data = await this.sequelize
      const data = await users.findOne({
        where: {
          username: body.username,
        },
        include: {
          model: customers,
        },
      });

      if (!data) throw new Error('User tidak ditemukan');

      const compare = await bcrypt.compare(body.password, data.password);
      if (!compare) throw new Error('password salah');

      const payload = { username: body.username };

      const token = this.jwtService.sign(payload);

      // response.cookie('token', token)

      return {
        message: 'success',
        access_token: token,
        data: data,
      };
    } catch (error) {
      return {
        status: 400,
        message: error.message,
      };
    }
  }
}
