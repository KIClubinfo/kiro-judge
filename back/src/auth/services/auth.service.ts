import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import { UserService } from './user.service';
import { IJWTPayload } from '../interfaces/jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(private readonly userService: UserService) {}

  async createToken() {
    const user: IJWTPayload = {
      email: 'user@email.com',
    };
    return jwt.sign(user, 'secretKey', { expiresIn: 3600 });
  }

  async validateUser(payload: IJWTPayload): Promise<any> {
    return await this.userService.findOneByEmail(payload.email);
  }
}