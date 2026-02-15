import { Exclude } from 'class-transformer';
import { Project } from 'src/projects/projects.entity';
import { Experience } from 'src/experiences/experiences.entity';
import { Contact } from 'src/contacts/contacts.entity';
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
  lastName?: string;

  @Column({
    type: 'boolean',
    nullable: false,
    default: false,
  })
  admin: boolean;

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

  @Column({
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  job: string;

  @Column({
    type: 'varchar',
    length: 96,
    nullable: true,
  })
  title: string;
  @Column({
    type: 'text',
    nullable: true,
  })
  description: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  githubUrl: string;

  @Column({
    type: 'varchar',
    length: 1024,
    nullable: true,
  })
  linkedinUrl: string;

  @OneToMany(() => Project, (project) => project.owner)
  projects?: Project;

  @OneToMany(() => Experience, (experience) => experience.owner)
  experiences?: Experience;

  @OneToMany(() => Contact, (contact) => contact.owner)
  contacts?: Contact;
}
