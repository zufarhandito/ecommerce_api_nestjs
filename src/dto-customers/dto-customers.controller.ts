import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DtoCustomersService } from './dto-customers.service';
import { CreateDtoCustomerDto } from './dto/create-dto-customer.dto';
import { UpdateDtoCustomerDto } from './dto/update-dto-customer.dto';

@Controller('dto-customers')
export class DtoCustomersController {
  constructor(private readonly dtoCustomersService: DtoCustomersService) {}

  @Post()
  create(@Body() createDtoCustomerDto: CreateDtoCustomerDto) {
    return this.dtoCustomersService.create(createDtoCustomerDto);
  }

  @Get()
  findAll() {
    return this.dtoCustomersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoCustomersService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateDtoCustomerDto: UpdateDtoCustomerDto,
  ) {
    return this.dtoCustomersService.update(+id, updateDtoCustomerDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoCustomersService.remove(+id);
  }
}
