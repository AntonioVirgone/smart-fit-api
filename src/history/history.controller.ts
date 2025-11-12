import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { SaveJsonDto } from './dto/save-json.dto';
import { History } from './entities/history.entity';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @Post('save-json')
  @HttpCode(HttpStatus.CREATED)
  async saveJson(@Body() saveJsonDto: SaveJsonDto): Promise<{
    message: string;
    data: History;
    id: number;
  }> {
    const history = await this.historyService.saveJson(saveJsonDto);

    return {
      message: 'JSON salvato con successo nella history',
      data: history,
      id: history.id,
    };
  }

  @Get()
  async findAll(): Promise<{
    message: string;
    data: History[];
    count: number;
  }> {
    const history = await this.historyService.findAll();

    return {
      message: 'Lista della history recuperata con successo',
      data: history,
      count: history.length,
    };
  }

  @Get(':id')
  async findById(@Param('id', ParseIntPipe) id: number): Promise<{ message: string; data: History | null }> {
    const history = await this.historyService.findById(id);

    return {
      message: 'Record della history recuperato con successo',
      data: history,
    };
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number): Promise<{
    message: string;
  }> {
    await this.historyService.delete(id);

    return {
      message: 'Record della history eliminato con successo',
    };
  }
}
