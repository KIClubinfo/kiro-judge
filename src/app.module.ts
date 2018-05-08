import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JudgeModule } from './judge/judge.module';
import { getOrmConfig } from './database.config';

@Module({
  imports: [TypeOrmModule.forRoot(getOrmConfig()), JudgeModule],
  controllers: [],
  components: [],
})
export class AppModule {}
