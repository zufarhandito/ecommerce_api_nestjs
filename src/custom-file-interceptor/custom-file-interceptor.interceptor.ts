import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  BadRequestException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { CreateDtoProductDto } from 'src/dto_product/dto/create-dto_product.dto';

@Injectable()
export class CustomFileInterceptorInterceptor implements NestInterceptor {
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<any>> {
    const data = context.switchToHttp().getRequest().body;

    // if(!data.name || !data.description || !data.price || !data.category_id) throw new BadRequestException("ada yg kosong")
    // CreateDtoProductDto

    return next.handle();
    // return data
  }
}
