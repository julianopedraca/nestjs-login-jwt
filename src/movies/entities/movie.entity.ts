import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
@Entity()
export class Movie {

    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'text', nullable: false})
    name: string;
  
}
