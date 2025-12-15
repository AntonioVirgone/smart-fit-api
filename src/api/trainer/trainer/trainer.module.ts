import { Module } from '@nestjs/common';
import { TrainerService } from './trainer.service';
import { TrainerController } from './trainer.controller';
import { PrismaService } from '../../../prisma/prisma.service';
import { CustomersService } from '../../customer/customers/customers.service';

@Module({
  providers: [TrainerService, PrismaService, CustomersService],
  controllers: [TrainerController],
})
export class TrainerModule {}
