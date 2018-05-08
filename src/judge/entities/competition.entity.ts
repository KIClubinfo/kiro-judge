import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('competitions')
export class Competition {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text') description: string;
}
