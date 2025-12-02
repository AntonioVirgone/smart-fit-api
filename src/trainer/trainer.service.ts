import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTrainerDto } from './dto/create-trainer.dto';
import { UpdateTrainerDto } from './dto/update-trainer.dto';

@Injectable()
export class TrainerService {
  constructor(private prisma: PrismaService) {}

  create(createTrainerDto: CreateTrainerDto) {
    return this.prisma.trainer.create({
      data: createTrainerDto,
    });
  }

  findAll() {
    return this.prisma.trainer.findMany({
      include: { customers: true },
    });
  }

  findOne(id: string) {
    return this.prisma.trainer.findFirst({
      where: { id },
      include: { customers: true },
    });
  }

  update(id: string, updateTrainerDto: UpdateTrainerDto) {
    return this.prisma.trainer.update({
      where: { id },
      data: updateTrainerDto,
    });
  }

  remove(id: string) {
    return this.prisma.trainer.delete({
      where: { id },
    });
  }
}
