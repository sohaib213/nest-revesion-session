import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
  MinLength,
} from 'class-validator';

export enum userRole {
  ADMIN = 'admin',
  USER = 'user',
}
export class CreateUserDto {
  @IsString()
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsString()
  confirmedPassword: string;

  @IsOptional()
  @IsString()
  username?: string;

  @Type(() => Number)
  @IsNumber()
  age: number;

  @IsOptional()
  @IsEnum(userRole)
  role: userRole = userRole.USER; // Default value
}
