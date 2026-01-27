import { Type } from 'class-transformer';
import { IsNumber, IsOptional, IsString, MinLength } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @MinLength(5, { message: 'Password must be at least 6 characters long' })
  password: string;

  @IsOptional()
  @IsString()
  username?: string;

  @Type(() => Number)
  @IsNumber()
  age: number;
}
