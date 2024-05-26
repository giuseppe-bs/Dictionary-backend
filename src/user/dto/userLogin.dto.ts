import { IsEmail, IsNotEmpty, IsString, Matches } from 'class-validator';

export class UserLoginDTO {
  @IsString({ message: 'Name must be a string' })
  @IsNotEmpty({ message: 'Name is required' })
  @Matches(/User \d+/, { message: 'Name must have a specific format' })
  name: string;

  @IsEmail(undefined, { message: 'Invalid email' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  password: string;
}
