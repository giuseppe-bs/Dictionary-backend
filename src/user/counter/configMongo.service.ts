import { Injectable } from '@nestjs/common';
import { Config } from './config.entity';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ConfigMongoService {
  constructor(
    @InjectModel('Config') private readonly configRepository: Model<Config>,
  ) {}

  async getNextSequenceValue(sequenceName: string): Promise<number> {
    const config = await this.configRepository
      .findOne({
        key: sequenceName,
      })
      .exec();

    if (!config) {
      const newConfig = new this.configRepository({
        key: sequenceName,
        value: 1,
      });
      await newConfig.save();
      return 1;
    }

    config.value += 1;
    await config.save();
    return config.value;
  }
}
