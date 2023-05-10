import { Controller, Get, Post, Body, Patch, Param, Delete, UseInterceptors, UploadedFile, ParseFilePipeBuilder, HttpStatus, UsePipes } from '@nestjs/common';
import { DtoProductService } from './dto_product.service';
import { CreateDtoProductDto } from './dto/create-dto_product.dto';
import { UpdateDtoProductDto } from './dto/update-dto_product.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import * as path from 'path';
import { diskStorage } from 'multer';

@Controller('dto-product')
export class DtoProductController {
  constructor(
    private readonly dtoProductService: DtoProductService
  ) {}

  @Post()
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './public/uploads',
      filename: (req, file, cb) => {
        return cb(null, 'product_'+Date.now()+path.extname(file.originalname));
      }
    })
  }))
  create(@Body() createDtoProductDto: CreateDtoProductDto, @UploadedFile(
    new ParseFilePipeBuilder()
      .addFileTypeValidator({
        fileType: 'jpg|jpeg|png'
      })
      .addMaxSizeValidator({
        maxSize: 10000000
      })
      .build()
  ) file: Express.Multer.File) {
    return this.dtoProductService.create(createDtoProductDto, file);
  }

  @Get()
  findAll() {
    return this.dtoProductService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoProductService.findOne(+id);
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', {
    storage: diskStorage({
      destination: './uploads',
      filename: (req, file, cb) => {
        return cb(null, 'product_'+Date.now()+path.extname(file.originalname));
      }
    })
  }))
  update(@Param('id') id: string, @Body() updateDtoProductDto: UpdateDtoProductDto, @UploadedFile(
    new ParseFilePipeBuilder()
    .addFileTypeValidator({
      fileType: 'jpg|jpeg|png'
    })
    .addMaxSizeValidator({
      maxSize: 10000000
    })
    .build()
  ) file: Express.Multer.File) {
    return this.dtoProductService.update(+id, updateDtoProductDto, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoProductService.remove(+id);
  }
}
