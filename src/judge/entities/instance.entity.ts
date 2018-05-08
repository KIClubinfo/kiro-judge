import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('instances')
export class Instance {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text') description: string;
}
