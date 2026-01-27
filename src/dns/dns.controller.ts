import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DnsService } from './dns.service';
import { CreateDnDto } from './dto/create-dn.dto';
import { UpdateDnDto } from './dto/update-dn.dto';

@Controller('dns')
export class DnsController {
  constructor(private readonly dnsService: DnsService) {}

  @Post()
  create(@Body() createDnDto: CreateDnDto) {
    return this.dnsService.create(createDnDto);
  }

  @Get()
  findAll() {
    return this.dnsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dnsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDnDto: UpdateDnDto) {
    return this.dnsService.update(+id, updateDnDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dnsService.remove(+id);
  }
}
