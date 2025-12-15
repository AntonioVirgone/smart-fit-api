import { Test, TestingModule } from '@nestjs/testing';
import { HistoryWorkoutService } from './history_workout.service';

describe('HistoryWorkoutService', () => {
  let service: HistoryWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HistoryWorkoutService],
    }).compile();

    service = module.get<HistoryWorkoutService>(HistoryWorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
