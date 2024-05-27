import { meaning } from '../wordDetail.entity';

export class wordDetailApiDto {
  word: string;
  meanings: meaning[];
  phonetics: {
    text?: string;
    audio: string;
  }[];
  origin: string;
}
