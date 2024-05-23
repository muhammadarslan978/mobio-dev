import { Test, TestingModule } from '@nestjs/testing';
import { RabitMqService } from './rabit-mq.service';

describe('RabitMqService', () => {
  let service: RabitMqService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RabitMqService],
    }).compile();

    service = module.get<RabitMqService>(RabitMqService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
