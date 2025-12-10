import { PartialType } from '@nestjs/mapped-types';
import { CreateTrainerDto } from './create-trainer.dto';

export class LoginTrainerDto extends PartialType(CreateTrainerDto) {}
