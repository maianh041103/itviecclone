import { ExecutionContext, ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { AuthGuard } from "@nestjs/passport";
import { Request } from "express";
import { IS_PUBLIC_KEY, IS_PUBLIC_PERMISSION } from "src/decorator/customize";

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {
  constructor(private reflector: Reflector) {
    super();
  }

  canActivate(context: ExecutionContext) {
    //Lấy ra giá trị của isPublic
    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      context.getHandler(),
      context.getClass()
    ]);

    if (isPublic) {
      return true;
    }

    return super.canActivate(context);
  }

  handleRequest(err: any, user: any, info: any, context: ExecutionContext, status?: any) {
    if (err || !user) {
      throw err || new UnauthorizedException({
        message: "Access token không hợp lệ"
      })
    }
    const permissions = user?.permissions ?? [];

    const request: Request = context.switchToHttp().getRequest();
    const method = request.method;
    const path = request?.route?.path as string;


    let isExist = permissions.find(permission => {
      return permission.method === method && permission.apiPath === path;
    });

    if (path.startsWith("/api/v1/auth")) {
      isExist = true;
    }

    const isPublicPermission = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_PERMISSION, [
      context.getHandler(),
      context.getClass()
    ]);

    if (!isExist && !isPublicPermission) {
      throw new ForbiddenException("Bạn không có quyền truy cập vào trang này");
    }

    return user;
  }
}