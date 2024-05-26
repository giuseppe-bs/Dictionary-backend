import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  MongooseModuleOptions,
  MongooseOptionsFactory,
} from '@nestjs/mongoose';

@Injectable()
export class MongoDBConfigService implements MongooseOptionsFactory {
  constructor(private configService: ConfigService) {}

  uri(): string {
    return (
      'mongodb://' +
      this.configService.get('MONGODB_USERNAME') +
      ':' +
      this.configService.get('MONGODB_PASSWORD') +
      '@' +
      this.configService.get('MONGODB_HOST') +
      ':' +
      this.configService.get('MONGODB_PORT') +
      '/' +
      this.configService.get('MONGODB_DATABASE')
    );
  }
  createMongooseOptions(): MongooseModuleOptions {
    return {
      uri: this.uri(),
    };
  }
}
