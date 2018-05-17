import { Column, CreateDateColumn, Entity, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import { Competition } from './competition.entity';

@Entity('instances')
export class Instance {
  @PrimaryGeneratedColumn() id: number;

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;

  @Column({ length: 500 })
  name: string;

  @Column('text') description: string;

  @Column() filename: string;

  @Column({ type: 'float', nullable: true, default: null }) startScore: number;

  @ManyToOne((type) => Competition, { nullable: false })
  competition: Competition;
}
