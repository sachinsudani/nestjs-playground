import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ROLES_KEY } from './roles.decorator';
import { Role } from './roles.enums';

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }
    canActivate(
        context: ExecutionContext,
    ): boolean | Promise<boolean> | Observable<boolean> {
        const roles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [context.getHandler(), context.getClass()]);
        if (!roles) {
            return true;
        }
        const request = context.switchToHttp().getRequest<{ headers: Record<string, string> }>();
        const user = request.headers['x-user-role'] as Role;
        return user && roles.includes(user);
    }
}
