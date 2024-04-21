import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { RolesService } from "src/roles/roles.service";
import { IUser } from "src/users/user.interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    private configService: ConfigService,
    private roleService: RolesService
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>("JWT_ACCESS_TOKEN_SECRET")
    });
  }

  async validate(payload: IUser) {
    const { _id, name, email, role } = payload;

    const roleUser = (await this.roleService.findOne(role._id)).toObject();

    return {
      _id,
      name,
      email,
      role,
      permissions: roleUser?.permissions ?? []
    }; //trả về đối tượng vào req.user dựa vào các thuộc tính return
    //Có thể thực hiện truy vấn trong db để lấy nhiều dữ liệu hơn
  }
}