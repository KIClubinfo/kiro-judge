import { Column, CreateDateColumn, Entity, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Team } from '../../judge/entities/team.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ length: 500 })
  name: string;

  @Column('text') description: string;

  @Column() isSuspended: boolean;

  @Column() isReleased: boolean;

  @ManyToMany((type) => Team, (team) => team.members)
  teams: Team[];
}
