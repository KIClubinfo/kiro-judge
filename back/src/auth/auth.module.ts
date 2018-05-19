import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JWT_SECRET } from './constants';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/passport/jwt.strategy';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [
    { provide: JWT_SECRET, useValue: process.env.JWT_SECRET },
    AuthService,
    JwtStrategy,
    UserService,
  ],
  controllers: [UserController],
})
export class AuthModule {}
