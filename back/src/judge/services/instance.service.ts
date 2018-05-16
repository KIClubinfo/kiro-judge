import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Instance } from '../entities/instance.entity';

@Injectable()
export class InstanceService {
  constructor(
    @InjectRepository(Instance)
    private readonly instanceRepository: Repository<Instance>,
  ) {}

  async findOne(id: number): Promise<Instance> {
    return this.instanceRepository.findOneOrFail(id, { relations: ['competition'] });
  }
}
