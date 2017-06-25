import { Appointment, Quote } from '../interfaces';
import { MarketService, Setting, WorkOrderService } from './';
import * as moment from 'moment-timezone';

export class ScheduleService {

  public static appointment(quoteId: number): Appointment {
    let localTz = Setting.localTimeZone();
    let status = 'Rejected';

    let quote = MarketService.get(quoteId);
    if (quote) {
      if (moment().tz(localTz).isBefore(quote.expiresAt)) {
        status = 'Confirmed';
      }

    } else {
      status = 'Unknown Quote';
    }

    WorkOrderService.create(quote);

  return {
      status: status,
    };
  }

}
