import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { IsUniqueEmailValidator } from './validator/isUniqueEmail.validator';
import { User } from './user.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserService } from './user.service';
import { ConfigService } from './counter/config.service';
import { Config } from './counter/config.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User, Config])],
  controllers: [AuthController],
  providers: [UserService, ConfigService, IsUniqueEmailValidator],
})
export class UserModule {}
