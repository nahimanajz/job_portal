import { PrismaService } from 'src/prisma/prisma.service';
import { AuthDto, SigninDto } from './dto';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';

import { User } from '@prisma/client';
import { Role } from 'src/common/enums/role.enum';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwt: JwtService,
    private config: ConfigService,
  ) {}

  async signup(dto: AuthDto) {
    const existingUser = await this.prisma.user.findFirst({
      where: {
        email: dto.email,
      },
    });

    console.log('user===>', existingUser);

    if (existingUser) {
      throw new ConflictException(
        'User already exists. Please sign in instead.',
      );
    }
      
   const hashPassword = await bcrypt.hash(dto.password, 10)
    const newUser = await this.prisma.user.create({
      data: {
        email: dto.email,
        password:  hashPassword,
        role: dto.role ?? Role.Applicant
      },
    });

    const token = await this.generateToken(newUser);

    return {
      message: `User signed up successfully`,
      data: newUser,
      accessToken: token,
    };
  }

  async signin(dto: SigninDto) {
    const user = await this.prisma.user.findFirst({
      where: {
        email: {
          equals: dto.email,
          mode: 'insensitive',
        },
      },
      select: {
        id: true,
        email: true,
        role: true,
        password: true,
      },
    });
    console.log("this is a user", user)
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    const hashMatch = await bcrypt.compare(dto.password, user.password);
    if (!hashMatch) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const data = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return {
      message: 'You are successfully logged in',
      data,
       accessToken: await this.generateToken(data),
    };
  }

  async generateToken(
    payload: Partial<User>
  ): Promise<string> {
    const data = {
      id: payload.id,
      email: payload.email,
      role: payload.role,
    };
    return await this.jwt.signAsync(data, {
      expiresIn: '1d',
      privateKey: process.env.JWT_SECRET,
    });
  }
}
