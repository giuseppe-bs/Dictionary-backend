import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { IsUniqueEmailValidator } from './validator/isUniqueEmail.validator';
import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';
import { ConfigService } from './counter/config.service';
import { Config, ConfigSchema } from './counter/config.entity';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, collection: 'User', schema: UserSchema },
      { name: Config.name, collection: 'Config', schema: ConfigSchema },
    ]),
  ],
  controllers: [AuthController],
  providers: [UserService, ConfigService, IsUniqueEmailValidator],
})
export class UserModule {}
