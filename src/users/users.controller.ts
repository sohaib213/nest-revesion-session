import { Body, Controller, Get, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('users')
export class UserController {
  @Get()
  getAllUsers() {
    return 'g';
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return 'c';
  }
}
