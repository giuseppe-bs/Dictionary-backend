import { Body, Controller, Post } from '@nestjs/common';
import { UserSinginDTO } from './dto/userSingin.dto';
import { UserLoginDTO } from './dto/userLogin.dto';
import { User } from './user.entity';
import { UserService } from './user.service';
import { UserSinginResultDTO } from './dto/userSinginResult.dto';

@Controller('/auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/singup')
  async singup(@Body() userLoginData: UserLoginDTO) {
    const user = new User();
    user.email = userLoginData.email;
    user.password = userLoginData.password;
    user.name = userLoginData.name;
    this.userService.singUp(user);
  }

  @Post('/singin')
  async singin(
    @Body() userLoginData: UserSinginDTO,
  ): Promise<UserSinginResultDTO> {
    const user = await this.userService.singIn(userLoginData);
    console.log(JSON.stringify(user));
    return {
      name: user.name,
      id: user._id.toHexString(),
      token: 'token',
    };
  }
}
