import {
  Column,
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from '../../auth/entities/user.entity';
import { Competition } from './competition.entity';
import { Submission } from './submission.entity';

@Entity('teams')
export class Team {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ length: 500 })
  name: string;

  // @Column('text') description: string;

  @ManyToOne((type) => Competition)
  competition: Competition;

  // FIXME SHOULD NOT CASCADE
  @ManyToMany((type) => User, (user) => user.teams, { cascade: true })
  @JoinTable()
  members: User[];

  @OneToMany((type) => Submission, (submission) => submission.team)
  submissions: Submission[];
}
