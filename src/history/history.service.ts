import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { History } from './entities/history.entity';
import { CreateHistoryDto } from './dto/create-history.dto';
import { SaveJsonDto } from './dto/save-json.dto';

@Injectable()
export class HistoryService {
  constructor(
    @InjectRepository(History)
    private readonly historyRepository: Repository<History>,
  ) {}

  async saveJson(saveJsonDto: SaveJsonDto): Promise<History> {
    const createHistoryDto: CreateHistoryDto = {
      json_data: saveJsonDto.jsonData,
      filename: saveJsonDto.filename || 'unknown.json',
      data_size: JSON.stringify(saveJsonDto.jsonData).length,
      status: saveJsonDto.status || 'completed',
    };

    const stringaJSON = JSON.stringify(createHistoryDto);
    const stringaUnita = 'Prepare element to save: ' + stringaJSON;

    console.log(stringaUnita);

    const history = this.historyRepository.create(createHistoryDto);
    return await this.historyRepository.save(history);
  }

  async findAll(): Promise<History[]> {
    return await this.historyRepository.find({
      order: { created_at: 'DESC' },
    });
  }

  async findById(id: number): Promise<History | null> {
    return await this.historyRepository.findOne({ where: { id } });
  }

  async delete(id: number): Promise<void> {
    await this.historyRepository.delete(id);
  }

  async deleteAll(): Promise<void> {
    await this.historyRepository.deleteAll();
  }
}
