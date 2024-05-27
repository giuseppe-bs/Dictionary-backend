import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { ObjectId } from 'mongodb';
import { Word } from './word.entity';

export class definition {
  definition: string;
  example: string;
}

export class meaning {
  partOfSpeech: string;
  definitions: definition[];
}

@Schema()
export class WordDetail {
  @Prop({ type: ObjectId, ref: 'Word' })
  word: Word;

  @Prop({ type: [meaning] })
  meaning: meaning[];

  @Prop({ type: String })
  phonetic: string;

  @Prop({ type: String })
  origin: string;
}

export const WordDetailSchema = SchemaFactory.createForClass(WordDetail);
