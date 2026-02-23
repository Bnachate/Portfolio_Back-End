import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from 'src/users/users.entity';
import { Tag } from 'src/tags/tags.entity';

@Entity()
export class Experience {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  job: string;

  @Column({
    type: 'varchar',
    length: 512,
    nullable: false,
  })
  company: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  logoUrl: string;

  @Column({
    type: 'timestamp',
    nullable: false,
  })
  startDate: Date;

  @Column({
    type: 'timestamp',
    nullable: true,
  })
  endDate?: Date;

  @ManyToOne(() => User, (user) => user.experiences, {
    eager: true,
  })
  owner: User;

  @ManyToMany(() => Tag, (tag) => tag.experiences, {
    eager: true,
  })
  @JoinTable()
  tags?: Tag[];

  @Column({
    type: 'int',
    nullable: true,
  })
  position?: number;
}
