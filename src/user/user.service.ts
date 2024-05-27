import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { UserLoginDTO } from './dto/userLogin.dto';
import { ConfigService } from './counter/config.service';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { UserSinginDTO } from './dto/userSingin.dto';
import { userAuthResultDTO } from './dto/userAuthResult.dto';
import { JwtService } from '@nestjs/jwt';

interface UserPayload {
  sub: string;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  constructor(
    //inject user mongoose
    @InjectModel('User') private readonly userRepository: Model<User>,
    private configService: ConfigService,
    private jwtService: JwtService,
  ) {}

  async singUp(userLogin: UserLoginDTO): Promise<userAuthResultDTO> {
    const user = await this.userRepository
      .findOne({
        email: userLogin.email,
        password: userLogin.password,
        name: userLogin.name,
      })
      .exec();

    const payload: UserPayload = {
      sub: user._id.toHexString(),
      name: user.name,
      email: user.email,
    };

    if (!user) {
      throw new Error('login failed');
    }
    return {
      name: user.name,
      id: user._id.toHexString(),
      token: await this.jwtService.signAsync(payload),
    };
  }

  async singIn(user: UserSinginDTO): Promise<userAuthResultDTO> {
    const name = await this.generateName();
    const newUser = new this.userRepository({
      email: user.email,
      password: user.password,
      name: name,
    });
    await newUser.save();

    const payload: UserPayload = {
      sub: newUser._id.toHexString(),
      name: newUser.name,
      email: newUser.email,
    };

    return {
      name: newUser.name,
      id: newUser._id.toHexString(),
      token: await this.jwtService.signAsync(payload),
    };
  }

  async generateName(): Promise<string> {
    // User + incrementing number
    return (
      'User ' +
      (await this.configService.getNextSequenceValue('userNameCounter'))
    );
  }

  async findByEmail(email: string) {
    const checkEmail = await this.userRepository
      .findOne({
        email: email,
      })
      .exec();
    return checkEmail;
  }
}
