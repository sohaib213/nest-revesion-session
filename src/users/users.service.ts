import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import users from '../common/data/users.json';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { UserEntity } from './entities/user.entity';
import { JwtPayload } from 'src/common/interfaces/JwtPayload-interface';
import { CreateUserDto } from './dto/createUser.dto';

@Injectable()
export class UsersService {
  constructor(private readonly jwtService: JwtService) {}

  private readonly saltOrRounds = 10;

  // we implement
  getAllUsers() {
    return users.map((user) => {
      return {
        email: user.email,
        username: user.username,
        age: user.age,
        role: user.role,
      };
    });
  }

  async createUser(createUserDto: CreateUserDto) {
    const { email, password, confirmedPassword, age, role } = createUserDto;
    let username = createUserDto.username;
    if (password !== confirmedPassword)
      throw new BadRequestException("Passwords dosen't match");
    if (!username) username = email.split('@')[0];
    const hashedPassword = await bcrypt.hash(password, this.saltOrRounds);
    const newUser: UserEntity = {
      email,
      username,
      age,
      password: hashedPassword,
      role,
    };
    users.push(newUser);
    return {
      newUser: {
        email: newUser.email,
        username: newUser.username,
        age: newUser.age,
      },
    };
  }
  // updateUser(updateUserDto: UpdateUserDto) {}

  async login({ email, password }: LoginDto) {
    const userFound = users.find((user) => user.email === email) as UserEntity;
    if (!userFound)
      throw new UnauthorizedException('Invalid email or password');
    const passwordMatch = await bcrypt.compare(password, userFound.password);
    if (!passwordMatch)
      throw new UnauthorizedException('Invalid email or password');
    const token = await this.generateToken(userFound);
    return { token };
  }

  async generateToken(user: UserEntity) {
    const payload: JwtPayload = {
      email: user.email,
      username: user.username,
      age: user.age,
      role: user.role,
    };
    return await this.jwtService.signAsync(payload);
  }
}
