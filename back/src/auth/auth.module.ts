import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/passport/jwt.strategy';
import { LocalStrategy } from './services/passport/local.strategy';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  providers: [AuthService, JwtStrategy, LocalStrategy, UserService],
  controllers: [UserController],
})
export class AuthModule {}
