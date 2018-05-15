import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Instance } from './instance.entity';
import { Team } from './team.entity';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column('float') score: number;

  @ManyToOne((type) => Team)
  team: Team;

  @ManyToOne((type) => Instance, { eager: true })
  instance: Instance;
}
