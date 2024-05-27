import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { IsUniqueEmailValidator } from './validator/isUniqueEmail.validator';
import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';
import { ConfigService } from './counter/config.service';
import { Config, ConfigSchema } from './counter/config.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, collection: 'User', schema: UserSchema },
      { name: Config.name, collection: 'Config', schema: ConfigSchema },
    ]),
    JwtModule.register({
      global: true,
      secret: 'secretKey',
      signOptions: {
        expiresIn: '24h',
      },
    }),
  ],
  controllers: [AuthController],
  providers: [UserService, ConfigService, IsUniqueEmailValidator],
})
export class UserModule {}
