import { Test, TestingModule } from '@nestjs/testing';
import { CustomerWorkoutController } from './customer_workout.controller';
import { CustomerWorkoutService } from './customer_workout.service';

describe('CustomerWorkoutController', () => {
  let controller: CustomerWorkoutController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CustomerWorkoutController],
      providers: [CustomerWorkoutService],
    }).compile();

    controller = module.get<CustomerWorkoutController>(CustomerWorkoutController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
