import { Test, TestingModule } from '@nestjs/testing';
import { DnsController } from './dns.controller';
import { DnsService } from './dns.service';

describe('DnsController', () => {
  let controller: DnsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DnsController],
      providers: [DnsService],
    }).compile();

    controller = module.get<DnsController>(DnsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
