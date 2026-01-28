import { Module } from '@nestjs/common';
import { DnsService } from './dns.service';
import { DnsController } from './dns.controller';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [DnsController],
  providers: [DnsService],
})
export class DnsModule {}
