import { Injectable } from '@nestjs/common';
import { DateService } from './date.service';

const tenantDateMapping: Record<string, string> = {
  tenantOne: 'iso',
  tenantTwo: 'string',
};

@Injectable()
export class DateProxy {
  //   @Inject(DateService)
  constructor(private readonly dateService: DateService) {}

  getDate(tenantId: string): string {
    return this.dateService.getDate(tenantDateMapping[tenantId]);
  }
}
