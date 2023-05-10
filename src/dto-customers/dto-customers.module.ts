import { Module } from '@nestjs/common';
import { DtoCustomersService } from './dto-customers.service';
import { DtoCustomersController } from './dto-customers.controller';
import { SequelizeModule } from '@nestjs/sequelize';
import { customers } from 'models';

@Module({
  imports: [SequelizeModule.forFeature([customers])],
  controllers: [DtoCustomersController],
  providers: [DtoCustomersService]
})
export class DtoCustomersModule {}
