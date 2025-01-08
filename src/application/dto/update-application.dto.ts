import { PartialType } from '@nestjs/swagger';
import { CreateApplicationDto } from './create-application.dto';
import { Status } from 'src/common/enums/role.enum';

export class UpdateApplicationDto extends PartialType(CreateApplicationDto) {
    status?: Status;
    id:string
}
