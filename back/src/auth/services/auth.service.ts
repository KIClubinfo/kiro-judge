import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';
import { User } from '../entities/user.entity';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken(user: User) {
    const payload: IJWTPayload = {
      email: 'user@email.com',
      teamId: 1,
      competitionId: 1,
    };
    return jwt.sign(payload, 'secretKey', { expiresIn: 3600 });
  }

  async validateUser(payload: IJWTPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }
}