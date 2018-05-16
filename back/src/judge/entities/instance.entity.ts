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

  @ManyToOne((type) => Competition, { nullable: false })
  competition: Competition;
}
