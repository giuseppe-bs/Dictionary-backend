import { Module } from '@nestjs/common';
import { EntriesController } from './entries.controller';
import { EntriesService } from './entries.service';
import { MongooseModule } from '@nestjs/mongoose';
import { WordDetail, WordDetailSchema } from './wordDetail.entity';
import { Word, WordSchema } from './word.entity';
import { HttpModule } from '@nestjs/axios';
import { DictionaryService } from './dictionary.service';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { User, UserSchema } from 'src/user/user.entity';
import { ConfigMongoService } from 'src/user/counter/configMongo.service';
import { JwtService } from '@nestjs/jwt';
import { ConfigModule } from '@nestjs/config';
import { Config, ConfigSchema } from 'src/user/counter/config.entity';
@Module({
  imports: [
    HttpModule,
    UserModule,
    ConfigModule,
    MongooseModule.forFeature([
      {
        name: Word.name,
        collection: 'words',
        schema: WordSchema,
      },
      {
        name: WordDetail.name,
        collection: 'WordDetail',
        schema: WordDetailSchema,
      },
      {
        name: User.name,
        schema: UserSchema,
        collection: 'User',
      },
      { name: Config.name, collection: 'Config', schema: ConfigSchema },
    ]),
  ],
  controllers: [EntriesController],
  providers: [
    EntriesService,
    DictionaryService,
    UserService,
    ConfigMongoService,
    JwtService,
  ],
})
export class EntriesModule {}
