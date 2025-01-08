import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsNotEmpty, IsNumber, IsString, IsUUID } from 'class-validator';
import { Status } from 'src/common/enums/role.enum';

export class CreateApplicationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty({
    type: String,
    required: true,
    default:"c73cb596-9993-4920-8312-061b212849c7"
  })
  jobId: string;

 
  @IsEnum(Status)
  @ApiProperty({
    enum: Status,
    required: true,
    default: Status.Pending,
  })
  status: Status;
  
}
