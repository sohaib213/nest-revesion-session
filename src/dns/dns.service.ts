import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { DnsDto } from './dto/dns.dto';
import { dnsRecords } from 'src/common/data/dnsDomains';

@Injectable()
export class DnsService {
  findIP(domainName: string) {
    const ip = dnsRecords.get(domainName);
    if (!ip) throw new NotFoundException('domain name not found');
    return { ip };
  }

  addIp(addDn: DnsDto) {
    if (dnsRecords.has(addDn.domain_name))
      throw new ConflictException('domain name already exists');
    dnsRecords.set(addDn.domain_name, addDn.ip);
    console.log(dnsRecords);
  }
  update(updateDnDto: DnsDto) {
    if (!dnsRecords.has(updateDnDto.domain_name))
      throw new BadRequestException('domain name not found');
    dnsRecords.set(updateDnDto.domain_name, updateDnDto.ip);
  }

  remove(id: number) {
    return `This action removes a #${id} dn`;
  }
}
