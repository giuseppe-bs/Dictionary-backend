import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { WordDetail } from './wordDetail.entity';
import { ObjectId } from 'mongodb';

@Schema()
export class Word {
  @Prop({ required: true, unique: true })
  word: string;

  @Prop({ required: false, ref: 'WordDetail', type: ObjectId })
  detail: WordDetail;
}

export const WordSchema = SchemaFactory.createForClass(Word);
