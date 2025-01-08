import { ApiProperty } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsString,
  MinLength,
  NotContains,
} from 'class-validator';
import { Role } from 'src/common/enums/role.enum';

export class AuthDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @NotContains('+')
  @ApiProperty({
    type: 'string',
    default: 'zed@yopmail.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(8)
  @ApiProperty({
    type: 'string',
    required: true,
    default: 'password',
  })
  password: string;

  @IsEnum(Role)
  @ApiProperty({
    enum: Role,
    required: true,
    default: Role.Applicant,
  })
  role: Role;
}
