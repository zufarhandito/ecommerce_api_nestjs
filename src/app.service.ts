import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';
import { users } from 'models';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AppService {
  constructor(private jwtService: JwtService) {}

  async login(body: any): Promise<any> {
    try {
      const data = await users.findOne({
        where: {
          username: body.username,
        },
      });
      if (!data) throw new Error('User tidak ditemukan');

      const compare = await bcrypt.compare(body.password, data.password);
      if (!compare) throw new Error('password salah');

      const payload = { username: body.username };

      return {
        access_token: this.jwtService.sign(payload),
      };
    } catch (error) {
      return error.message;
    }
  }
}
