import {
  BadRequestException,
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { getResponseData } from '../utils/api-response';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();

    return next.handle().pipe(
      catchError(async (error) => {
        if (error?.name === 'PrismaClientKnownRequestError') {
          if (error?.code === 'P2002' && request?.method === 'POST') {
            throw new BadRequestException(
              `Duplicate entry, data created already`,
            );
          }
          throw new UnprocessableEntityException(
            'Something went wrong, prisma error',
          );
        }
        return getResponseData(request.res.statusCode, error);
      }),
    );
  }
}
