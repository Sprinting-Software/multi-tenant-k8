import { Injectable } from '@nestjs/common';

@Injectable()
export class DateService {
  getDate(format: string | undefined): string {
    if (format === 'iso') {
      return new Date().toISOString();
    } else if (format === 'string') {
      return new Date().toDateString();
    } else {
      return new Date().toUTCString();
    }
  }
}
