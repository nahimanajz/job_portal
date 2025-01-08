import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class AdminRoleGuard extends RoleGuard {
  constructor(prisma: PrismaService, jwtService: JwtService) {
    super(prisma, jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canAlterApplication = await super.canActivate(context);
    if (!canAlterApplication) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== Role.Admin) {
      throw new ForbiddenException("This role is for Admin user only");
    }

    return true;
  }
}
