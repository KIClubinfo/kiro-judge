import { BadRequestException, Body, Controller, Post, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';

import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

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

    if (user.teams.length !== 1) {
      throw new BadRequestException('Must have exactly one team!');
    }

    const team = user.teams[0];

    return {
      token: await this.authService.createToken(user, {
        teamId: team.id,
        competitionId: team.competition.id,
      }),
    };
  }
}
