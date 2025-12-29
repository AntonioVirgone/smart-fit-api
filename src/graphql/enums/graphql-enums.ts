import { registerEnumType } from '@nestjs/graphql';
import { WorkoutType } from '../../api/customer/history_workout/enum/workout-type.enum';
import { WorkoutIntensity } from '../../api/customer/history_workout/enum/workout-intensity.enum';

registerEnumType(WorkoutType, {
  name: 'WorkoutType',
});

registerEnumType(WorkoutIntensity, {
  name: 'WorkoutIntensity',
});
