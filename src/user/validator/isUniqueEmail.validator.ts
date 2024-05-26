import {
  ValidationOptions,
  ValidatorConstraint,
  ValidatorConstraintInterface,
  registerDecorator,
} from 'class-validator';
import { UserService } from '../user.service';
import { Injectable } from '@nestjs/common';

@Injectable()
@ValidatorConstraint({ async: true })
export class IsUniqueEmailValidator implements ValidatorConstraintInterface {
  constructor(private userService: UserService) {}

  async validate(value: any): Promise<boolean> {
    const user = await this.userService.findByEmail(value);
    return !user;
  }
  defaultMessage(): string {
    return 'Email already exists';
  }
}

export const IsUniqueEmail = (options: ValidationOptions) => {
  return (object: any, propertyName: string) => {
    registerDecorator({
      target: object.constructor,
      propertyName: propertyName,
      options: options,
      constraints: [],
      validator: IsUniqueEmailValidator,
    });
  };
};
