import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { HistoryModule } from './history/history.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutModule } from './workout/workouts/workout.module';
import { MailModule } from './mail/mail.module';
import { CustomersModule } from './customer/customers/customers.module';
import { ExerciseModule } from './workout/exercise/exercise.module';
import { PlanModule } from './workout/plan/plan.module';
import { CustomerWorkoutModule } from './customer/customer_workout/customer_workout.module';
import { CustomerProfileModule } from './customer/customer_profile/customer_profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production' ? '.env.production' : '.env',
    }),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>('JWT_SECRET'),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forRootAsync({
      useFactory: (config: ConfigService) => ({
        type: 'postgres',
        host: config.get<string>('DB_HOST'),
        port: config.get<number>('DB_PORT'),
        username: config.get<string>('DB_USERNAME'),
        password: config.get<string>('DB_PASSWORD'),
        database: config.get<string>('DB_NAME'),

        autoLoadEntities: true,

        // Path corretto delle entità compilate
        entities: [__dirname + '/../**/*.entity.js'],

        // 🔥 Fondamentale per Render + produzione
        synchronize: false,

        // 🔥 Esegue automaticamente le migration all'avvio
        migrationsRun: true,

        // Path delle migration (compilate in dist)
        migrations: [__dirname + '/../migrations/*.js'],
      }),
      inject: [ConfigService],
    }),
    HistoryModule,
    UsersModule,
    AuthModule,
    WorkoutModule,
    MailModule,
    CustomersModule,
    ExerciseModule,
    PlanModule,
    CustomerWorkoutModule,
    CustomerProfileModule,
  ],
})
export class AppModule {}
