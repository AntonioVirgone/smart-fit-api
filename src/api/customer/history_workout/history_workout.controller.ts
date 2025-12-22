import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { HistoryWorkoutService } from './history_workout.service';
import { CreateHistoryWorkoutDto } from './dto/create-history_workout.dto';
import { UpdateHistoryWorkoutDto } from './dto/update-history_workout.dto';

@Controller('history-workout')
export class HistoryWorkoutController {
  constructor(private readonly historyWorkoutService: HistoryWorkoutService) {}

  @Post('customer/:customerId')
  async createCustomer(
    @Param('customerId') customerId: string,
    @Body() dto: CreateHistoryWorkoutDto,
  ) {
    console.log('create');
    return await this.historyWorkoutService.create(
      customerId,
      dto as Required<CreateHistoryWorkoutDto>,
    );
  }

  @Get('customer/:customerId')
  async findAll(@Param('customerId') customerId: string) {
    console.log('find');
    return this.historyWorkoutService.findAll(customerId);
  }

  @Get()
  async find() {
    console.log('find');
    return this.historyWorkoutService.find();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.historyWorkoutService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updateHistoryWorkoutDto: UpdateHistoryWorkoutDto,
  ) {
    return this.historyWorkoutService.update(+id, updateHistoryWorkoutDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.historyWorkoutService.remove(+id);
  }
}
