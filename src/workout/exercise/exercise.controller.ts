import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ApiOperation } from '@nestjs/swagger';
import { UpdateExerciseDto } from './dto/update-exercise.dto';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post(':trainerCode')
  @ApiOperation({ summary: 'Create exercise' })
  async createPlane(
    @Param('trainerCode') trainerCode: string,
    @Body() createExercise: CreateExerciseDto,
  ) {
    return await this.exerciseService.createExercise(trainerCode, createExercise);
  }

  @Get()
  @ApiOperation({ summary: 'Get all exercises' })
  async getExercises() {
    return await this.exerciseService.findAll();
  }

  @Get(':exerciseId')
  @ApiOperation({ summary: 'Find exercise by id' })
  async find(@Param('exerciseId') exerciseId: string) {
    return await this.exerciseService.findOne(exerciseId);
  }

  @Patch(':exerciseId')
  @ApiOperation({ summary: 'Update exercise' })
  async patch(
    @Param('exerciseId') exerciseId: string,
    @Body() updateExerciseDto: UpdateExerciseDto,
  ) {
    return await this.exerciseService.update(exerciseId, updateExerciseDto);
  }

  @Delete()
  @ApiOperation({ summary: 'Delete all exercises' })
  async deleteExercises() {
    return await this.exerciseService.removeAll();
  }
}
