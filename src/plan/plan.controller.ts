import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePlanByExerciseCode } from './dto/create-plan-by-excercise-code.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create plan with exercises' })
  async create(@Body() createPlanByExerciseCode: CreatePlanByExerciseCode) {
    return await this.planService.createPlanByExCode(createPlanByExerciseCode);
  }

  @Patch(':planCode/exercise')
  @ApiOperation({ summary: 'Add exercise to plan' })
  async addExercise(
    @Param('planCode') planCode: string,
    @Body() addExerciseDto: AddExerciseDto,
  ) {
    return await this.planService.addExerciseToPlan(planCode, addExerciseDto);
  }

  @Patch(':planCode/exercise/:exerciseCode')
  @ApiOperation({ summary: 'Remove exercise to plan' })
  async removeExercise(
    @Param('planCode') planCode: string,
    @Param('exerciseCode') exerciseCode: string,
  ) {
    return await this.planService.removeExerciseFromPlan(
      planCode,
      exerciseCode,
    );
  }

  @Get()
  @ApiOperation({ summary: 'Get all plan' })
  findAll() {
    return this.planService.findAll();
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all plans' })
  async removeAllPlan() {
    return await this.planService.removeAll();
  }
}
