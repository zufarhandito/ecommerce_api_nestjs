import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DtoOrderService } from './dto_order.service';
import { CreateDtoOrderDto } from './dto/create-dto_order.dto';
import { UpdateDtoOrderDto } from './dto/update-dto_order.dto';

@Controller('dto-order')
export class DtoOrderController {
  constructor(private readonly dtoOrderService: DtoOrderService) {}

  @Post()
  create(@Body() createDtoOrderDto: CreateDtoOrderDto) {
    return this.dtoOrderService.create(createDtoOrderDto);
  }

  @Get()
  findAll() {
    return this.dtoOrderService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoOrderService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDtoOrderDto: UpdateDtoOrderDto) {
    return this.dtoOrderService.update(+id, updateDtoOrderDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoOrderService.remove(+id);
  }
}
