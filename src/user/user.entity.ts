import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  ObjectId,
  ObjectIdColumn,
  Unique,
  UpdateDateColumn,
} from 'typeorm';

@Entity({ name: 'users' })
@Unique('name', ['name'])
export class User {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column({ name: 'name', type: 'string', nullable: false })
  name: string;

  @Column({ name: 'email', type: 'string', nullable: false })
  email: string;

  @Column({ name: 'password', type: 'string', nullable: false })
  password: string;

  @CreateDateColumn({ name: 'created_at' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updated_at' })
  updatedAt: string;

  @DeleteDateColumn({ name: 'deleted_at' })
  deletedAt: string;
}
