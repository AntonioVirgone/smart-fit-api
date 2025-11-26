import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Put,
} from '@nestjs/common';
import { PlanService } from './plan.service';
import { UpdatePlanDto } from './dto/update-plan.dto';
import { ApiOperation } from '@nestjs/swagger';
import { CreatePlanByExerciseCode } from './dto/create-plan-by-excercise-code.dto';
import { AddExerciseDto } from './dto/add-exercise.dto';

@Controller('plan')
export class PlanController {
  constructor(private readonly planService: PlanService) {}

  @Post()
  @ApiOperation({ summary: 'Create plan' })
  async day(@Body() createDayDto: CreatePlanByExerciseCode) {
    return await this.planService.createDayByExCode(createDayDto);
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

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.planService.findOne(id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePlanDto: UpdatePlanDto) {
    return this.planService.update(+id, updatePlanDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.planService.remove(+id);
  }
}
