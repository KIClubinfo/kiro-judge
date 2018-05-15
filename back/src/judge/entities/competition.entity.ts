import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Instance } from './instance.entity';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ length: 500 })
  name: string;

  @Column('text') description: string;

  @Column() subjectUrl: string;

  @OneToMany((type) => Instance, (instance) => instance.competition)
  instances: Instance[];
}
