import { Inject, Injectable } from '@nestjs/common';
import { WordDetail } from './wordDetail.entity';
import { Word } from './word.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';
import { DictionaryService } from './dictionary.service';
import { wordDetailDto } from './dto/wordDetail.dto';
import { ObjectId } from 'mongodb';
import { UserService } from 'src/user/user.service';

@Injectable()
export class EntriesService {
  constructor(
    @InjectModel('Word')
    private readonly wordModel: Model<Word>,
    @InjectModel('WordDetail')
    private readonly wordDetailModel: Model<WordDetail>,
    @Inject(UserService)
    private readonly userService: UserService,
    private readonly dictionaryService: DictionaryService,
  ) {}

  async getAllEntries(query: any) {
    console.log(query);
    return (await this.wordModel.find().exec()).map((word) => word.word);
  }

  async getWordDetail(word: string): Promise<wordDetailDto> {
    const wordMongo = await this.wordModel
      .findOne({
        word: word,
      })
      .exec();
    if (!wordMongo) {
      throw new Error(`Word ${word} not found in DB`);
    }

    console.log(`Word ${word} found in DB`);
    if (wordMongo.detail) {
      const detail: WordDetail = await this.wordDetailModel
        .findOne({
          _id: wordMongo.detail,
        })
        .exec();
      return this.toDetailDto(detail);
    } else {
      const detailFromWeb =
        await this.dictionaryService.getWordDetailFromAPI(wordMongo);
      if (detailFromWeb) {
        const wordDetail = await this.saveDetail(
          wordMongo,
          new this.wordDetailModel(detailFromWeb),
        );
        return this.toDetailDto(wordDetail);
      }
    }
  }

  async saveDetail(
    // eslint-disable-next-line @typescript-eslint/ban-types
    word: Document<unknown, {}, Word> & Word & { _id: ObjectId },
    detail: WordDetail,
  ) {
    const wordDetail = new this.wordDetailModel(detail);
    await wordDetail.save();
    word.detail = wordDetail;
    await word.save();
    return wordDetail;
  }

  async favoriteWord(word: string, user: any) {
    const wordMongo = await this.wordModel
      .findOne({
        word: word,
      })
      .exec();
    if (!wordMongo) {
      throw new Error(`Word ${word} not found in DB`);
    }

    console.log(`Word ${word} found in DB`);
    const userMongo = await this.userService.getUserById(user.userId);
    if (!userMongo) {
      throw new Error(`User ${user._id} not found in DB`);
    }

    console.log(`User ${user._id} found in DB`);
    if (!userMongo.favorite.includes(wordMongo.word))
      userMongo.favorite.push(wordMongo.word);
    await userMongo.save();
    return userMongo.favorite;
  }

  async saveWordInHistory(word: string, user: any) {
    const wordMongo = await this.wordModel
      .findOne({
        word: word,
      })
      .exec();
    if (!wordMongo) {
      throw new Error(`Word ${word} not found in DB`);
    }

    console.log(`Word ${word} found in DB`);
    const userMongo = await this.userService.getUserById(user.userId);
    if (!userMongo) {
      throw new Error(`User ${user._id} not found in DB`);
    }

    console.log(`User ${user._id} found in DB`);
    userMongo.history.push({
      word: wordMongo.word,
      date: new Date(),
    });
    await userMongo.save();
    return userMongo.history;
  }

  private toDetailDto(wordDetail: WordDetail): wordDetailDto {
    return {
      word: wordDetail.word.word,
      phonetic: wordDetail.phonetic,
      meaning: wordDetail.meaning,
      origin: wordDetail.origin,
    };
  }
}
