import { Test, TestingModule } from '@nestjs/testing';
import { OnbordingService } from './onbording.service';

describe('OnbordingService', () => {
  let service: OnbordingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OnbordingService],
    }).compile();

    service = module.get<OnbordingService>(OnbordingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
