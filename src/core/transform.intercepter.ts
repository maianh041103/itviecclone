import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable, map } from "rxjs";
import { RESPONSE_MESSAGE } from "src/decorator/customize";


export interface Response {
  statusCode: number;
  message: string;
  data: any;
}

@Injectable()
export class TransformInterceptor
  implements NestInterceptor<Response> {

  constructor(private reflector: Reflector) { }

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response> {

    return next
      .handle()
      .pipe(
        map((data) => ({
          statusCode: context.switchToHttp().getResponse().statusCode,
          message: this.reflector.get<string>(RESPONSE_MESSAGE, context.getHandler(),) || '',
          data
        })),
      );
  }
}