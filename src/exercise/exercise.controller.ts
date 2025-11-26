import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { ExerciseService } from './exercise.service';
import { CreateExerciseDto } from './dto/create-exercise.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('exercise')
export class ExerciseController {
  constructor(private readonly exerciseService: ExerciseService) {}

  @Post()
  @ApiOperation({ summary: 'Create exercise' })
  async createPlane(@Body() createExercise: CreateExerciseDto) {
    return await this.exerciseService.createExercise(createExercise);
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

  @Delete()
  @ApiOperation({ summary: 'Delete all exercises' })
  async deleteExercises() {
    return await this.exerciseService.removeAll();
  }
}
