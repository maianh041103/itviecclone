import { BadRequestException, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { genSaltSync, hashSync } from 'bcryptjs';
import { Response } from 'express';
import ms from 'ms';
import { SoftDeleteModel } from 'soft-delete-plugin-mongoose';
import { USER_ROLE } from 'src/databases/sample';
import { RolesService } from 'src/roles/roles.service';
import { RegisterUserDto } from 'src/users/dto/create-user.dto';
import { User, UserDocument } from 'src/users/schemas/user.schema';
import { IUser } from 'src/users/user.interface';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UsersService,
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly roleService: RolesService,
    @InjectModel(User.name) private userModel: SoftDeleteModel<UserDocument>
  ) { }

  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findOneByUserName(username);
    if (user) {
      const check = this.userService.checkPassword(pass, user.password);
      if (check === true) {
        const userRole = user.role as unknown as { _id: string, name: string }

        const role = await this.roleService.findOne(userRole._id);

        const newUser = {
          ...user.toObject(),
          permissions: role?.permissions ?? []
        }

        return newUser;
      }
    }
    return null;
  }

  async login(user: IUser, res: Response) {
    const { _id, name, email, role, permissions } = user;
    const payload = {
      sub: "token login",
      iss: "from server",
      _id,
      name,
      email,
      role
    }

    const refresh_token = this.createRefreshToken(payload);

    await this.userService.updateRefreshToken(refresh_token, _id);

    //Set cookie
    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRES")) * 1000
    })

    return {
      access_token: this.jwtService.sign(payload),
      user: {
        _id,
        name,
        email,
        role,
        permissions
      }
    }
  }

  hashPassword = (password: string) => {
    const salt = genSaltSync(10);
    const hash = hashSync(password, salt);
    return hash;
  }

  async register(data: RegisterUserDto) {
    //Check email exist
    const isExist = await this.userModel.findOne({
      email: data.email
    });
    if (isExist) {
      throw new BadRequestException(`Email ${data.email} đã tồn tại trên hệ thống. Vui lòng sử dụng email khác`);
    }
    //Hash code
    data.password = await this.hashPassword(data.password);

    const roleId = await this.roleService.findRoleIdByName(USER_ROLE);
    const user = await this.userModel.create({ ...data, role: roleId });
    return {
      _id: user?._id,
      createdAt: user?.createdAt
    };
  }

  createRefreshToken = (payload) => {
    return this.jwtService.sign(payload, {
      secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET"),
      expiresIn: ms(this.configService.get<string>("JWT_REFRESH_EXPIRES")) / 1000  //đơn vị là s
    });
  }

  async processNewToken(token: string, res: Response) {
    try {
      this.jwtService.verify(token, {
        secret: this.configService.get<string>("JWT_REFRESH_TOKEN_SECRET")
      });

      const user = await this.userService.getUserByToken(token);

      if (user) {
        let { _id, name, email, role } = user;
        const payload = {
          sub: "token refresh",
          iss: "from server",
          _id,
          name,
          email,
          role
        }

        const refresh_token = this.createRefreshToken(payload);

        await this.userService.updateRefreshToken(refresh_token, _id);

        //Clear cookie
        res.clearCookie("refresh_token");

        //Set cookie
        res.cookie("refresh_token", refresh_token, {
          httpOnly: true,
          maxAge: ms(this.configService.get<string>("JWT_REFRESH_EXPIRES")) * 1000
        })

        const temp = user.role as unknown as { _id: string, name: string };
        const userRole = await this.roleService.findOne(temp._id);

        return {
          access_token: this.jwtService.sign(payload),
          user: {
            _id,
            name,
            email,
            role,
            permissions: userRole?.permissions ?? []
          }
        }
      } else {
        throw new BadRequestException({ message: "Refresh token không hợp lệ" });
      }
    } catch (error) {
      throw new BadRequestException({ message: "Refresh token không hợp lệ" });
    }
  }

  async logout(res: Response, user: IUser) {
    res.clearCookie("refresh_token");
    await this.userService.updateRefreshToken(null, user._id);
    return "ok";
  }
}
