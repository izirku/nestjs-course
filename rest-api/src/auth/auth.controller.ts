import { Controller, Post, Body, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import * as password from 'password-hash-and-salt';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';

@Controller('login')
export class AuthController {
  constructor(@InjectModel('User') private userModel: Model) {}

  @Post()
  async login(
    @Body('email') email: string,
    @Body('password') plainTextPassword: string,
  ) {
    const user = await this.userModel.findOne({ email });

    if (!user) {
      console.log('user does not exist in database: ' + email);
      throw new UnauthorizedException();
    }

    return new Promise((resolve, reject) => {
      password(plainTextPassword).verifyAgainst(
        user.passwordHash,
        (_err, verified) => {
          if (!verified) {
            reject(new UnauthorizedException());
          }

          const authJwtToken = jwt.sign(
            { email, roles: user.roles },
            JWT_SECRET,
          );

          resolve({
            authJwtToken,
          });
        },
      );
    });
  }
}
