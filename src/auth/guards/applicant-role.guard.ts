import { Injectable, ExecutionContext, ForbiddenException } from '@nestjs/common';
import { RoleGuard } from './role.guard';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { Role } from '@prisma/client';

@Injectable()
export class ApplicantRoleGuard extends RoleGuard {
  constructor(prisma: PrismaService, jwtService: JwtService) {
    super(prisma, jwtService);
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const canActivateBusiness = await super.canActivate(context);
    if (!canActivateBusiness) return false;

    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role !== Role.Applicant) {
      throw new ForbiddenException("Only authorized users can consume this Endpoint");
    }

    return true;
  }
}
