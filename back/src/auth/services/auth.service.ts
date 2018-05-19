import { Inject, Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { JWT_SECRET } from '../constants';
import { User } from '../entities/user.entity';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    @Inject(JWT_SECRET) private readonly jwtSecret: string,
  ) {}

  async createToken(user: User, extraClaims: {teamId, competitionId}) {
    const payload: IJWTPayload = {
      ...extraClaims,
      email: user.email,
    };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: 5 * 3600 });
  }

  async validateUser(payload: IJWTPayload): Promise<User> {
    return await this.userService.findOneByEmail(payload.email);
  }
}
