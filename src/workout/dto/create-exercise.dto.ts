import { IsArray, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Column } from 'typeorm';

export class CreateExerciseDto {
  @IsNotEmpty()
  @IsString()
  @ApiProperty({ example: 'CHEST PRESS', description: 'Titolo esercizio' })
  name: string;

  @IsString()
  @ApiProperty({
    example:
      'Esercizio per i pettorali - 4 serie x 8 ripetizioni - Recupero: 90 secondi',
    description: 'Descrizione esercizio',
  })
  description: string;

  @IsString()
  @ApiProperty({
    example: 'bench_press',
    description: 'Nome icona/image da usare in app',
  })
  imageName: string;

  @IsString()
  @ApiProperty({ example: 'Pettorali', description: 'Gruppo muscolare' })
  muscleGroup: string;

  @IsNumber()
  @ApiProperty({ example: 4, description: 'Numero di serie' })
  sets: number;

  @IsNumber()
  @ApiProperty({ example: 8, description: 'Numero di ripetizioni' })
  repetitions: number;

  @IsNumber()
  @ApiProperty({ example: 90, description: 'tempo di recupero' })
  recovery: number;

  @IsArray()
  @IsString({ each: true })
  @ApiProperty({ isArray: true, type: 'array' })
  instructions: string[];
}
