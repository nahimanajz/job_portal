import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString, NotContains } from 'class-validator';

export class SigninDto {
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @NotContains('+')
  @ApiProperty({
    type: 'string',
    default: 'zedpromax@yopmail.com',
    required: true,
  })
  email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: 'string',
    default: 'password',
    required: true,
  })
  password: string;
}
