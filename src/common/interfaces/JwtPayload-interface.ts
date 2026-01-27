import { userRole } from 'src/users/dto/createUser.dto';

export interface JwtPayload {
  email: string;
  username: string;
  age: number;
  role: userRole;
}
