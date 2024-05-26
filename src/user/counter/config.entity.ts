import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
@Schema({})
export class Config {
  @Prop({ required: true, unique: true, type: String })
  key: string;

  @Prop({ required: true, type: Number })
  value: number;
}

export const ConfigSchema = SchemaFactory.createForClass(Config);
