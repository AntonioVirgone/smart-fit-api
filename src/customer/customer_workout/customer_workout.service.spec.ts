import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWorkoutService } from './customer_workout.service';

describe('CustomerWorkoutService', () => {
  let service: CustomerWorkoutService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CustomerWorkoutService],
    }).compile();

    service = module.get<CustomerWorkoutService>(CustomerWorkoutService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
