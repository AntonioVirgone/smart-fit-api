import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service'; // <--- PATH CORRETTO
import { RegisterDeviceTokenDto } from './dto/register-device-token.dto';
import { ApnsService } from './providers/apns.service';

@Injectable()
export class NotificationsService {
  constructor(
    private prisma: PrismaService,
    private apns: ApnsService,
  ) {}

  /** Salva o aggiorna un token */
  async registerDeviceToken(customerId: string, dto: RegisterDeviceTokenDto) {
    await this.customerVerify(customerId);

    const existing = await this.prisma.deviceToken.findUnique({
      where: { token: dto.token },
    });

    if (existing) {
      return this.prisma.deviceToken.update({
        where: { token: dto.token },
        data: {
          platform: dto.platform,
          customerId,
        },
      });
    }

    return this.prisma.deviceToken.create({
      data: {
        token: dto.token,
        platform: dto.platform,
        customerId,
      },
    });
  }

  /** Invia notifica APNS al cliente */
  async sendWorkoutAssignedNotification(
    customerId: string,
    workoutName: string,
  ) {
    await this.customerVerify(customerId);
    const tokens = await this.prisma.deviceToken.findMany({
      where: { customerId },
    });

    if (tokens.length === 0) return;

    for (const t of tokens) {
      if (t.platform === 'ios') {
        await this.apns.send(
          t.token,
          'Nuovo workout assegnato!',
          `Hai ricevuto "${workoutName}".`,
        );
      }
      // FUTURO: android -> FCM
    }
  }

  private async customerVerify(customerId: string) {
    const customer = await this.prisma.customer.findUnique({
      where: { id: customerId, status: 'active' },
    });

    if (!customer) {
      throw new NotFoundException('Customer not found');
    } else if (customer.status !== 'active') {
      throw new NotFoundException('Customer not active');
    }
  }
}
