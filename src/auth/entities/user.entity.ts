import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn() id: number;

  @Column({ length: 500 })
  name: string;

  @Column('text') description: string;

  @Column() isSuspended: boolean;

  @Column() isReleased: boolean;
}
