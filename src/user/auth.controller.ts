import { Body, Controller, Post } from '@nestjs/common';
import { UserSinginDTO } from './dto/userSingin.dto';
import { UserLoginDTO } from './dto/userLogin.dto';
import { UserService } from './user.service';
import { userAuthResultDTO } from './dto/userAuthResult.dto';

@Controller('/auth')
export class AuthController {
  constructor(private userService: UserService) {}

  @Post('/singup')
  async singup(
    @Body() userLoginData: UserLoginDTO,
  ): Promise<userAuthResultDTO> {
    return await this.userService.singUp(userLoginData);
  }

  @Post('/singin')
  async singin(
    @Body() userLoginData: UserSinginDTO,
  ): Promise<userAuthResultDTO> {
    const user = await this.userService.singIn(userLoginData);
    return user;
  }
}
