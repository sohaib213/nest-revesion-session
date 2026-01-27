import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DnsService } from './dns.service';
import { DnsDto } from './dto/dns.dto';
import { UpdateDnDto } from './dto/update-dn.dto';

@Controller('dns')
export class DnsController {
  constructor(private readonly dnsService: DnsService) {}

  @Post()
  create(@Body() createDnDto: DnsDto) {
    return this.dnsService.addIp(createDnDto);
  }

  @Get(':domainName')
  getIP(@Param('domainName') domainName: string) {
    return this.dnsService.findIP(domainName);
  }

  @Patch()
  update(@Body() updateDnDto: DnsDto) {
    return this.dnsService.update(updateDnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dnsService.remove(+id);
  }
}
