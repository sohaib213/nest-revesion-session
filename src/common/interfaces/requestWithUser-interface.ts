import { Request } from 'express';
import { JwtPayload } from './JwtPayload-interface';

export interface RequestWithUser extends Request {
  currentUser: JwtPayload;
}
