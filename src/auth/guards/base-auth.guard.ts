import {
  Injectable,
  CanActivate,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { extractTokenFromHeader } from 'src/common/utils';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class BaseAuthGuard implements CanActivate {
  constructor(
    protected readonly prisma: PrismaService,
    protected readonly jwtService: JwtService,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = extractTokenFromHeader(request);
    if (!token) {
      throw new UnauthorizedException();
    }
    try {
      const payload = await this.jwtService.verifyAsync(token, {
        secret: process.env.JWT_SECRET,
      });
      request['user'] = payload;
     
    } catch (e) {
      throw new UnauthorizedException();
    }
    return true;
  }
}
