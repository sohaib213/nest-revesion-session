import { userRole } from '../dto/createUser.dto';

export interface UserEntity {
  email: string;
  password: string;
  username: string;
  age: number;
  role: userRole;
}
