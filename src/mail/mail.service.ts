import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class MailService {
  private resend: Resend;

  constructor() {
    this.resend = new Resend(process.env.RESEND_API_KEY);
  }

  async sendTestEmail(to: string, code: string) {
    const { data, error } = await this.resend.emails.send({
      from: 'Acme <onboarding@resend.dev>',
      to,
      subject: 'Test email from NestJS',
      html: `
      <h1>Clicca sul codice</h1>
      <p>
        <a href="https://example.com/verify?code=${encodeURIComponent(code)}">
          Usa questo link per confermare: ${code}
        </a>
      </p>
    `,
    });

    if (error) {
      throw new Error(error.message);
    }

    return data;
  }
}
