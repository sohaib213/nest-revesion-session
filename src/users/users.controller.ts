import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { UsersService } from './users.service';
import { GetUsersQuerryDto } from './dto/getUsersQuerry.dto';
import { LoginDto } from './dto/login.dto';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UsersService) {}
  @Get()
  getAllUsers() {
    return this.userService.getAllUsers();
  }
  // getAllUsers(@Query() querry: GetUsersQuerryDto) {
  //   return this.userService.getAllUsers(querry);
  // }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.userService.createUser(body);
  }

  @Post('login')
  login(@Body() body: LoginDto) {
    return this.userService.login(body);
  }
  // @Post()
  // createUser(@Body() body: CreateUserDto) {
  //   return this.userService.createUser(body);
  // }
}
