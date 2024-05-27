import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from './auth/auth.guard';
import { User } from './auth/user.decorator';
import { UserService } from './user.service';

@Controller('/user/me')
export class UserController {
  constructor(private userService: UserService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getMe(@User() user: any) {
    return this.userService.getMe(user);
  }

  @Get('/favorites')
  @UseGuards(JwtAuthGuard)
  async getFavorites(@User() user: any) {
    return this.userService.getFavorite(user);
  }

  @Get('/history')
  @UseGuards(JwtAuthGuard)
  async getHistory(@User() user: any) {
    return this.userService.getHistory(user);
  }
}
