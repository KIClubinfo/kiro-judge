import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find();
  }

  async findOne(id): Promise<User> {
    return this.userRepository.findOneOrFail(id);
  }

  async findOneByEmail(email): Promise<User> {
    return this.userRepository.findOneOrFail({ email }, { relations: ['teams', 'teams.competition']});
  }
}
