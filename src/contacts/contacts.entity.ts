import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';

@Entity()
export class Contact {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  name: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  subject: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  message: string;

  @ManyToOne(() => User, (user) => user.contacts, {
    eager: true,
  })
  owner: User;

  @CreateDateColumn()
  createDate: Date;
}
