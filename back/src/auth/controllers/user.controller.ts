import { Body, Controller, Get, NotFoundException, Param, Post, UnauthorizedException, UseGuards } from '@nestjs/common';
import { UserService } from '../services/user.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from '../services/auth.service';

import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Get()
  // FIXME remove
  async findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @UseGuards(AuthGuard('jwt'))
  async findOne(@Param('id') id) {
    try {
      return await this.userService.findOne(id);
    } catch (e) {
      throw new NotFoundException(e);
    }
  }

  @Post('login')
  async login(@Body('email') email, @Body('password') password) {
    let user;
    try {
      user = await this.userService.findOneByEmail(email);
    } catch (e) {
      throw new UnauthorizedException();
    }

    const passwordValid = await bcrypt.compare(password, user.password);
    if (!passwordValid) {
      throw new UnauthorizedException();
    }

    return this.authService.createToken(user);
  }
}
