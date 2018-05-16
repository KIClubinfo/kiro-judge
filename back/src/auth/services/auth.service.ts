import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { User } from '../entities/user.entity';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from './user.service';

export const SECRET_KEY = 'mBg1om2DAtElIpM8p8BcEZCruThktpOW';


@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken(user: User, extraClaims: {teamId, competitionId}) {
    const payload: IJWTPayload = {
      ...extraClaims,
      email: user.email,
    };
    return jwt.sign(payload, SECRET_KEY, { expiresIn: 5 * 3600 });
  }

  async validateUser(payload: IJWTPayload): Promise<User> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
