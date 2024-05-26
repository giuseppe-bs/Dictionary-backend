import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './user.entity';
import { UserLoginDTO } from './dto/userLogin.dto';
import { Repository } from 'typeorm';
import { ConfigService } from './counter/config.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    private configService: ConfigService,
  ) {}

  async singUp(userLogin: UserLoginDTO) {
    const user = await this.userRepository.findOneBy({
      email: userLogin.email,
      password: userLogin.password,
      name: userLogin.name,
    });
    if (!user) {
      throw new Error('login failed');
    }
    return user;
  }

  async singIn(user: User) {
    user.name = await this.generateName();
    await this.userRepository.save(user);
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
