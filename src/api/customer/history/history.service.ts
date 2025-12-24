import { Injectable } from '@nestjs/common';
import { History, Prisma } from '@prisma/client';
import { CreateHistoryDto } from './dto/create-history.dto';
import { SaveJsonDto } from './dto/save-json.dto';
import { PrismaService } from '../../../prisma/prisma.service';

@Injectable()
export class HistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async saveJson(
    customerId: string,
    saveJsonDto: SaveJsonDto,
  ): Promise<History> {
    const createHistoryDto: CreateHistoryDto = {
      customerId: customerId,
      jsonData: saveJsonDto.jsonData,
      filename: saveJsonDto.filename || 'unknown.json',
      dataSize: JSON.stringify(saveJsonDto.jsonData).length,
      status: saveJsonDto.status || 'completed',
    };
    const data: Prisma.HistoryUncheckedCreateInput = {
      customerId: createHistoryDto.customerId,
      jsonData: createHistoryDto.jsonData,
      filename: createHistoryDto.filename,
      dataSize: createHistoryDto.dataSize,
      status: createHistoryDto.status,
    };

    return await this.prisma.history.create({ data });
  }

  async findAll(): Promise<History[]> {
    return await this.prisma.history.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async findByCustomerId(customerId: string): Promise<History[]> {
    return await this.prisma.history.findMany({ where: { customerId } });
  }

  async findById(id: number): Promise<History | null> {
    return await this.prisma.history.findUnique({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.prisma.history.delete({ where: { id } });
  }

  async deleteAll(): Promise<void> {
    await this.prisma.history.deleteMany();
  }
}
