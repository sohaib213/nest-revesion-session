import { PartialType } from '@nestjs/mapped-types';
import { CreateDnDto } from './create-dn.dto';

export class UpdateDnDto extends PartialType(CreateDnDto) {}
