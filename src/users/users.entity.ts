import { Exclude } from 'class-transformer';
import { Project } from 'src/projects/projects.entity';
import { Experience } from 'src/experiences/experiences.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  firstName: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  lastName: string;

  @Column({
    type: 'smallint',
    width: 1,
    nullable: false,
    default: 0,
  })
  admin: 0 | 1;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
    unique: true,
  })
  email: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: false,
  })
  @Exclude()
  password: string;

  @OneToMany(() => Project, (project) => project.owner)
  projects?: Project;

  @OneToMany(() => Experience, (experience) => experience.owner)
  experiences?: Experience;
}
