import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export class History {
  word: string;
  date: Date;
}

@Schema({
  timestamps: true,
})
export class User {
  @Prop({ required: true, unique: true, type: String })
  name: string;

  @Prop({ required: true, unique: true, type: String })
  email: string;

  @Prop({ required: true, type: String })
  password: string;

  @Prop({ required: false, type: [String] })
  favorite: string[];

  @Prop({ required: false, type: [History] })
  history: History[];
}

export const UserSchema = SchemaFactory.createForClass(User);
