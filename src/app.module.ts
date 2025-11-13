import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from './history/history.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres', // o 'mysql', 'sqlite', ecc.
      host: 'dpg-d49rb5v5r7bs73e1sqd0-a',
      port: 5432,
      username: 'smart_fit_db_user',
      password: 'QB6i1s6wrduz6qE8MCzEJ9bk78t34lka',
      database: 'smart_fit_db',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true, // Solo per sviluppo - disattivare in produzione
    }),
    HistoryModule,
  ],
})
export class AppModule {}
