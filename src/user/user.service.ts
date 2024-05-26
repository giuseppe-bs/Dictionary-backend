import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserLoginDTO } from './dto/userLogin.dto';
import { ConfigService } from './counter/config.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSinginDTO } from './dto/userSingin.dto';

@Injectable()
export class UserService {
  constructor(
    //inject user mongoose
    @InjectModel('User') private readonly userRepository: Model<User>,
    private configService: ConfigService,
  ) {}

  async singUp(userLogin: UserLoginDTO) {
    const user = await this.userRepository
      .findOne({
        email: userLogin.email,
        password: userLogin.password,
        name: userLogin.name,
      })
      .exec();
    if (!user) {
      throw new Error('login failed');
    }
    return user;
  }

  async singIn(user: UserSinginDTO) {
    const name = await this.generateName();
    const newUser = new this.userRepository({
      email: user.email,
      password: user.password,
      name: name,
    });
    return newUser.save();
  }

  async generateName(): Promise<string> {
    // User + incrementing number
    return (
      'User ' +
      (await this.configService.getNextSequenceValue('userNameCounter'))
    );
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository.findOne({
      where: { email: email },
    });
    return checkEmail;
  }
}
