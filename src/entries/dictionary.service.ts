import { Injectable } from '@nestjs/common';
import { firstValueFrom } from 'rxjs';
import { WordDetail } from './wordDetail.entity';
import { HttpService } from '@nestjs/axios';
import { wordDetailApiDto } from './dto/wordDetailAPI.dto';
import { Word } from './word.entity';

@Injectable()
export class DictionaryService {
  constructor(private readonly httpService: HttpService) {}

  private Uri = 'https://api.dictionaryapi.dev/api/v2/entries/en/';

  private async getWordDetail(word: string) {
    const { data } = await firstValueFrom(
      this.httpService.get<wordDetailApiDto[]>(this.Uri + word),
    );
    return data.length > 0 ? data[0] : null;
  }
  async getWordDetailFromAPI(word: string | Word) {
    let wordFetch: string;
    if (typeof word === 'object') {
      wordFetch = word.word;
    } else {
      wordFetch = word;
    }
    const response = await this.getWordDetail(wordFetch);

    if (response) {
      const wordDetail = new WordDetail();
      wordDetail.phonetic = response.phonetics.filter((p) => p.text)[0].text;
      wordDetail.meaning = response.meanings;
      wordDetail.origin = response.origin;
      if (typeof word === 'object') {
        wordDetail.word = word;
      }
      return wordDetail;
    }
  }
}
