import { Injectable } from '@nestjs/common';
import { CreateDnDto } from './dto/create-dn.dto';
import { UpdateDnDto } from './dto/update-dn.dto';

@Injectable()
export class DnsService {
  create(createDnDto: CreateDnDto) {
    return 'This action adds a new dn';
  }

  findAll() {
    return `This action returns all dns`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dn`;
  }

  update(id: number, updateDnDto: UpdateDnDto) {
    return `This action updates a #${id} dn`;
  }

  remove(id: number) {
    return `This action removes a #${id} dn`;
  }
}
