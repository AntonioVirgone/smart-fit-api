import {
  Controller,
  Post,
  Get,
  Delete,
  Body,
  Param,
  HttpCode,
  HttpStatus,
  ParseIntPipe,
  UseGuards,
  Req,
} from '@nestjs/common';
import { HistoryService } from './history.service';
import { SaveJsonDto } from './dto/save-json.dto';
import { History } from '@prisma/client';
import { JwtAuthGuard } from '../auth/guard/jwt-auth.guard';

@Controller('history')
export class HistoryController {
  constructor(private readonly historyService: HistoryService) {}

  @UseGuards(JwtAuthGuard)
  @Post('save-json')
  @HttpCode(HttpStatus.CREATED)
  async saveJson(
    @Req() req,
    @Body() saveJsonDto: SaveJsonDto,
  ): Promise<{
    message: string;
    data: History;
    id: number;
  }> {
    const history = await this.historyService.saveJson(
      req.user.customerId,
      saveJsonDto,
    );

    return {
      message: 'JSON salvato con successo nella history',
      data: history,
      id: history.id,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async findAll(@Req() req): Promise<{
    message: string;
    data: History[];
    count: number;
  }> {
    if (req.user.role === 'admin') {
      const history = await this.historyService.findAll();
      return {
        message: 'Lista della history recuperata con successo',
        data: history,
        count: history.length,
      };
    }
    return {
      message: 'Lista della history recuperata con successo',
      data: [],
      count: 0,
    };
  }

  @UseGuards(JwtAuthGuard)
  @Get(':customerId/user')
  async findOne(@Req() req, @Param('customerId') customerId: string) {
    const history = await this.historyService.findByCustomerId(customerId);
    return {
      message: 'Lista della history recuperata con successo',
      data: history,
      count: history.length,
    };
  }

  @Get(':id')
  async findById(
    @Param('id', ParseIntPipe) id: number,
  ): Promise<{ message: string; data: History | null }> {
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

  @Delete()
  async deleteAll(): Promise<{
    message: string;
  }> {
    await this.historyService.deleteAll();
    return {
      message: 'Record della history eliminati con successo',
    };
  }
}
