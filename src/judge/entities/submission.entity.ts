import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('submissions')
export class Submission {
  @PrimaryGeneratedColumn() id: number;

  @Column('float') score: number;
}
