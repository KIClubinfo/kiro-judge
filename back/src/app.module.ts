import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { JudgeModule } from './judge/judge.module';
import getOrmConfig from './ormconfig';

@Module({
  imports: [
    TypeOrmModule.forRoot(getOrmConfig() as any),
    AuthModule,
    JudgeModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
