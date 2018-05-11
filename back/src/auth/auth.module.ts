import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserController } from './controllers/user.controller';
import { User } from './entities/user.entity';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './services/passport/jwt.strategy';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  components: [AuthService, JwtStrategy, UserService],
  controllers: [UserController],
})
export class AuthModule {}
