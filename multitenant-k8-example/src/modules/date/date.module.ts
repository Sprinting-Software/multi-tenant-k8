import { Module } from '@nestjs/common';
import { DateController } from './date.controller';
import { DateProxy } from './date.proxy';
import { DateService } from './date.service';

@Module({
  providers: [DateService, DateProxy],
  controllers: [DateController],
})
export class DateModule {}
