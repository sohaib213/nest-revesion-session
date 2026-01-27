import { PartialType } from '@nestjs/mapped-types';
import { DnsDto } from './dns.dto';

export class UpdateDnDto extends PartialType(DnsDto) {}
