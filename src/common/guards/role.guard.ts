import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { RequestWithUser } from '../interfaces/requestWithUser-interface';
import { userRole } from 'src/users/dto/createUser.dto';

@Injectable()
export class RoleGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request: RequestWithUser = context.switchToHttp().getRequest();
    if (request.currentUser.role !== userRole.ADMIN) return false;
    return true;
  }
}
