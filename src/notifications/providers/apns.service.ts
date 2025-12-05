import { Injectable, Logger } from '@nestjs/common';
import * as apn from 'apn';

@Injectable()
export class ApnsService {
  private readonly logger = new Logger(ApnsService.name);
  private readonly provider: apn.Provider;

  constructor() {
    this.provider = new apn.Provider({
      token: {
        key: 'src/certs/AuthKey_VYC35Q2KW4.p8',
        keyId: 'VYC35Q2KW4',
        teamId: '2DMW5G3LV8',
      },
      production: false,
    });
  }

  async send(token: string, title: string, body: string): Promise<void> {
    const note = new apn.Notification();

    note.alert = { title, body };
    note.sound = 'default';
    note.topic = 'it.spritelab.SmartFit';

    try {
      const result = await this.provider.send(note, token);

      const sentCount = result.sent.length;
      const failedCount = result.failed.length;

      this.logger.log(
        `APNS → token: ${token} | sent: ${sentCount} | failed: ${failedCount}`,
      );
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : String(err);

      this.logger.error(`APNS error for token ${token}: ${message}`);
    }
  }
}
