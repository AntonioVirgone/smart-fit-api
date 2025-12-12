import { Test, TestingModule } from '@nestjs/testing';
import { HistoryWorkoutController } from './history_workout.controller';
import { HistoryWorkoutService } from './history_workout.service';

describe('HistoryWorkoutController', () => {
  let controller: HistoryWorkoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HistoryWorkoutController],
      providers: [HistoryWorkoutService],
    }).compile();

    controller = module.get<HistoryWorkoutController>(HistoryWorkoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
