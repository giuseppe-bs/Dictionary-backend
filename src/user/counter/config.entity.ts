import { Entity, ObjectIdColumn, Column, ObjectId } from 'typeorm';

@Entity('config')
export class Config {
  @ObjectIdColumn()
  id: ObjectId;

  @Column()
  key: string;

  @Column()
  value: number;
}
