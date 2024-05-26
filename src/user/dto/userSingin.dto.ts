import { IsEmail, IsNotEmpty, IsString } from 'class-validator';
import { IsUniqueEmail } from '../validator/isUniqueEmail.validator';

export class UserSinginDTO {
  @IsEmail({}, { message: 'Invalid email' })
  @IsUniqueEmail({ message: 'Email already exists' })
  email: string;

  @IsString({ message: 'Password must be a string' })
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
