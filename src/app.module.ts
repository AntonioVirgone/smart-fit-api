import { Module } from '@nestjs/common';
import { HistoryModule } from './api/customer/history/history.module';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { WorkoutModule } from './api/trainer/workout/workout.module';
import { MailModule } from './mail/mail.module';
import { CustomersModule } from './api/customer/customers/customers.module';
import { ExerciseModule } from './api/trainer/exercise/exercise.module';
import { PlanModule } from './api/trainer/plan/plan.module';
import { CustomerWorkoutModule } from './api/customer/customer_workout/customer_workout.module';
import { CustomerProfileModule } from './api/customer/customer_profile/customer_profile.module';
import { PrismaModule } from './prisma/prisma.module';
import { TrainerModule } from './api/trainer/trainer/trainer.module';
import { HealthModule } from './health.module';
import { NotificationsModule } from './notifications/notifications.module';

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
    PrismaModule,
    HealthModule,
    HistoryModule,
    UsersModule,
    AuthModule,
    WorkoutModule,
    MailModule,
    NotificationsModule,
    CustomersModule,
    ExerciseModule,
    PlanModule,
    CustomerWorkoutModule,
    CustomerProfileModule,
    TrainerModule,
  ],
})
export class AppModule {}
