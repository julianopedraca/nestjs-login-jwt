import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Users {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable: false})
    username: string;
  
    @Column({ type: 'text', nullable: false})
    password: string;
  
}
