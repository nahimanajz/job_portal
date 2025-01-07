import { ApiProperty } from '@nestjs/swagger';
import { IsIn, IsOptional } from 'class-validator';

export class UpdateApplicationDto {
  @IsOptional()
  @IsIn(['Pending', 'Reviewed', 'Accepted'])
  @ApiProperty({default:"Reviewed"})
  status: string;
}