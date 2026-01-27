import { IsIP, IsString } from 'class-validator';

export class DnsDto {
  @IsString()
  domain_name: string;

  @IsString()
  @IsIP()
  ip: string;
}
