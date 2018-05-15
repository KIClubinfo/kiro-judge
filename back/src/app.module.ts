import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import ormConfig from '../ormconfig';
import { AuthModule } from './auth/auth.module';
import { JudgeModule } from './judge/judge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(ormConfig),
    AuthModule,
    JudgeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
