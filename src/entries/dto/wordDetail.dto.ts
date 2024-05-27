import { meaning } from '../wordDetail.entity';

export class wordDetailDto {
  word: string;
  meaning: meaning[];
  phonetic: string;
  origin: string;
}
