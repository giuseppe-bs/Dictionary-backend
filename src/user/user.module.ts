import { Module } from '@nestjs/common';
import { AuthController } from './auth/auth.controller';
import { IsUniqueEmailValidator } from './validator/isUniqueEmail.validator';
import { User, UserSchema } from './user.entity';
import { UserService } from './user.service';
import { ConfigMongoService } from './counter/configMongo.service';
import { Config, ConfigSchema } from './counter/config.entity';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtStrategy } from './strategy/jwt.strategy';

@Module({
  imports: [
    ConfigModule,
    MongooseModule.forFeature([
      { name: User.name, collection: 'User', schema: UserSchema },
      { name: Config.name, collection: 'Config', schema: ConfigSchema },
    ]),
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '60m' },
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    UserService,
    ConfigMongoService,
    IsUniqueEmailValidator,
    JwtStrategy,
  ],
})
export class UserModule {}
