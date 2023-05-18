import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DtoUserService } from './dto_user.service';
import { CreateDtoUserDto } from './dto/create-dto_user.dto';
import { UpdateDtoUserDto } from './dto/update-dto_user.dto';
// import { UseGuards } from '@nestjs/common';
// import { AuthGuard } from 'src/auth.guard';

// @UseGuards(AuthGuard)
@Controller('users')
export class DtoUserController {
  constructor(private readonly dtoUserService: DtoUserService) {}

  @Post()
  create(@Body() createDtoUserDto: CreateDtoUserDto) {
    return this.dtoUserService.create(createDtoUserDto);
  }

  @Post('sp')
  createSP(@Body() createDtoUserDto: CreateDtoUserDto) {
    return this.dtoUserService.createSP(createDtoUserDto);
  }

  @Get()
  findAll() {
    return this.dtoUserService.findAll();
    // return 'woi'
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dtoUserService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDtoUserDto: UpdateDtoUserDto) {
    return this.dtoUserService.update(+id, updateDtoUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dtoUserService.remove(+id);
  }
}
