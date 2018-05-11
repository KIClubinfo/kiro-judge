import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { getOrmConfig } from '../ormconfig';
import { JudgeModule } from './judge/judge.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig()),
    AuthModule,
    JudgeModule,
  ],
  controllers: [],
  components: [],
})
export class AppModule {}
