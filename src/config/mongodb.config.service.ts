import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { TypeOrmModuleOptions, TypeOrmOptionsFactory } from '@nestjs/typeorm';

@Injectable()
export class MongoDBConfigService implements TypeOrmOptionsFactory {
  constructor(private configService: ConfigService) {}

  createTypeOrmOptions(): TypeOrmModuleOptions {
    return {
      type: 'mongodb',
      host: 'mongo',
      port: 27017,
      password: this.configService.get('MONGODB_NEST_PASSWORD'),
      username: this.configService.get('MONGODB_NEST_USERNAME'),
      database: this.configService.get('MONGODB_DATABASE'),
      useUnifiedTopology: true,
      useNewUrlParser: true,
      entities: [],
      synchronize: true,
    };
  }
}
