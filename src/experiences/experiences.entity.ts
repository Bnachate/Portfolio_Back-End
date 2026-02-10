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
  title: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  projectImageUrl: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: false,
  })
  githubUrl: string;

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
