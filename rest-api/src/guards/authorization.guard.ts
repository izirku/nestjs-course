import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
  ForbiddenException,
} from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AuthorizationGuard implements CanActivate {
  constructor(private allowedRoles: string[]) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const host = context.switchToHttp();
    const request = host.getRequest();
    const user = request['user'];
    const allowed = this.isAllowed(user.roles);

    if (!allowed) {
      throw new ForbiddenException();
    }

    return true;
  }

  isAllowed(userRoles: string[]): boolean {
    let allowed = false;

    userRoles.forEach(role => {
      if (!allowed && this.allowedRoles.includes(role)) {
        allowed = true;
      }
    });

    return allowed;
  }
}
