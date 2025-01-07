import { IsString, IsEmail, MinLength, IsOptional } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'The unique email of the user' , default:"jz1@example.com"})
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @ApiProperty({ description: 'The password of the user (minimum 6 characters)' , default:"myPassword"})
  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password: string;

  @ApiProperty({ description: 'The role of the user (e.g., admin, applicants)', default: 'applicants' })
  @IsOptional()
  @IsString()
  userRole?: string;
}
