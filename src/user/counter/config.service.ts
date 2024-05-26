import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Config } from './config.entity';

@Injectable()
export class ConfigService {
  constructor(
    @InjectRepository(Config)
    private readonly configRepository: Repository<Config>,
  ) {}

  async getNextSequenceValue(sequenceName: string): Promise<number> {
    const config = await this.configRepository.findOne({
      where: { key: sequenceName },
    });

    if (!config) {
      const newConfig = this.configRepository.create({
        key: sequenceName,
        value: 1,
      });
      await this.configRepository.save(newConfig);
      return 1;
    }

    config.value += 1;
    await this.configRepository.save(config);
    return config.value;
  }
}
