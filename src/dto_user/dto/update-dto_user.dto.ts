import { PartialType } from '@nestjs/mapped-types';
import { CreateDtoUserDto } from './create-dto_user.dto';

export class UpdateDtoUserDto extends PartialType(CreateDtoUserDto) {
    id?:number;
}
