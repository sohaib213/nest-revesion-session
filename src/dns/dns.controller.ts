import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DnsService } from './dns.service';
import { DnsDto } from './dto/dns.dto';
import { AuthGuard } from 'src/common/guards/AuthGuard.guard';
import { RoleGuard } from 'src/common/guards/role.guard';

@Controller('dns')
export class DnsController {
  constructor(private readonly dnsService: DnsService) {}

  @UseGuards(AuthGuard, RoleGuard)
  @Post()
  create(@Body() createDnDto: DnsDto) {
    return this.dnsService.addIp(createDnDto);
  }

  @Get(':domainName')
  getIP(@Param('domainName') domainName: string) {
    return this.dnsService.findIP(domainName);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Patch()
  update(@Body() updateDnDto: DnsDto) {
    return this.dnsService.update(updateDnDto);
  }

  @UseGuards(AuthGuard, RoleGuard)
  @Delete(':domainName')
  remove(@Param('domainName') domainName: string) {
    return this.dnsService.remove(domainName);
  }
}
