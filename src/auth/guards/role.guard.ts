import { Injectable, ForbiddenException, ExecutionContext } from '@nestjs/common';
import { BaseAuthGuard } from './base-auth.guard';

@Injectable()
export class RoleGuard extends BaseAuthGuard {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivateBase = await super.canActivate(context);
    if (!canActivateBase) return false;

    const request = context.switchToHttp().getRequest();
   const role = request?.user?.['role'] ?? null;
    return true;
  }
}
