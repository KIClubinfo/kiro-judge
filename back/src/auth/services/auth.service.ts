import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken(user: User, extraClaims: {teamId, competitionId}) {
    const payload: IJWTPayload = {
      ...extraClaims,
      email: user.email,
    };
    return jwt.sign(payload, 'secretKey', { expiresIn: 3600 });
  }

  async validateUser(payload: IJWTPayload): Promise<User> {
    return await this.userService.findOneByEmail(payload.email);
  }
}