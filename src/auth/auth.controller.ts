import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Get,
  Post,
  Query,
  Param,
  Req,
  UseGuards,
  Res,
  Patch,
} from '@nestjs/common';
import { ApiExcludeEndpoint, ApiTags } from '@nestjs/swagger';
import { SkipThrottle } from '@nestjs/throttler';
import { AuthService } from './auth.service';
import { AuthDto, SigninDto } from './dto';
import { AuthGuard } from '@nestjs/passport';
import { Response } from 'express';


@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @SkipThrottle()
  @Post('signup')
  signup(@Body() dto: AuthDto) {
    return this.authService.signup(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('signin')
  signin(@Body() dto: SigninDto) {
    return this.authService.signin(dto);
  }
}
