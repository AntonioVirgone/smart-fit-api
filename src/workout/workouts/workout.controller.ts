import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { WorkoutService } from './workout.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateWorkoutByPlanCodeDto } from './dto/create-workout-by-plan-code.dto';
import { AddPlanDto } from './dto/add-plan.dto';

@ApiTags('Workout')
@Controller('workout')
export class WorkoutController {
  constructor(private readonly workoutService: WorkoutService) {}

  /*
  @UseGuards(JwtAuthGuard)
  @Post(':customerId/user')
  async assign(
    @Param('customerId') customerId: string,
    @Body() createWorkoutDto: CreateWorkoutDto,
  ) {
    return await this.workoutService.create(customerId, createWorkoutDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get(':customerId/user')
  async find(@Param('customerId') customerId: string) {
    return await this.workoutService.findByCustomerId(customerId);
  }
  */

  @Post()
  @ApiOperation({ summary: 'Save workout with plans' })
  async create(@Body() createWorkoutByPlanCode: CreateWorkoutByPlanCodeDto) {
    return await this.workoutService.createWorkoutByPlanCode(
      createWorkoutByPlanCode,
    );
  }

  @Get()
  findAll() {
    return this.workoutService.findAll();
  }

  @Patch(':workoutCode/plan')
  @ApiOperation({ summary: 'Add plan to workout' })
  async addPlan(
    @Param('workoutCode') workoutCode: string,
    @Body() addPlanDto: AddPlanDto,
  ) {
    return await this.workoutService.addPlanToWorkout(workoutCode, addPlanDto);
  }

  @Patch(':workoutCode/plan/:planCode')
  @ApiOperation({ summary: 'Remove plan from workout' })
  async removeExercise(
    @Param('workoutCode') workoutCode: string,
    @Param('planCode') planCode: string,
  ) {
    return await this.workoutService.removePlanFromWorkout(
      workoutCode,
      planCode,
    );
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all workout' })
  async delete() {
    return await this.workoutService.removeAll();
  }
}
