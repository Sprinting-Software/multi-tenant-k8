import { Controller, Get } from '@nestjs/common';
import { DateProxy } from './date.proxy';

@Controller('date')
export class DateController {
  constructor(private readonly dateProxy: DateProxy) {}

  @Get()
  getDate(): Record<string, string> {
    const tenantId = process.env.TENANT_ID ?? '';
    return { date: this.dateProxy.getDate(tenantId) };
  }
}
