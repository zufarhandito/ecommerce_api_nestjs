import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import multer from 'multer';
import { MulterModule } from '@nestjs/platform-express/multer';
import { SequelizeModule } from '@nestjs/sequelize';
import { DtoProductCategoryModule } from './dto_product_category/dto_product_category.module';
import { DtoProductModule } from './dto_product/dto_product.module';
import { DtoUserModule } from './dto_user/dto_user.module';
import { DtoCustomersModule } from './dto-customers/dto-customers.module';
import { DtoOrderModule } from './dto_order/dto_order.module';
import { users } from 'models';
import { JwtModule } from '@nestjs/jwt';
// import { jwtConstants } from './constants';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.SECRET_KEY,
      signOptions: { expiresIn: '60s' },
    }),
    SequelizeModule.forRootAsync({
      useFactory: () => ({
        dialect: 'postgres',
        host: process.env.DB_HOST,
        port: parseInt(process.env.DB_PORT),
        username: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_NAME,
        models: [],
        autoLoadModels:true
      }),
    }),
    SequelizeModule.forFeature([users]),
    DtoProductCategoryModule,
    DtoProductModule,
    DtoUserModule,
    DtoCustomersModule,
    DtoOrderModule,
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}