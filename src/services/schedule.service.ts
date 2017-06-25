import { Appointment, Quote } from '../interfaces';
import { MarketService } from './';
import * as moment from 'moment-timezone';

export class ScheduleService {

  public static appointment(quoteId: number): Appointment {
  let status = 'Rejected';

  let quote = MarketService.get(quoteId);
  if (quote) {
    if (moment().tz('America/New_York').isBefore(quote.expiresAt)) {
      status = 'Confirmed';
    }

  } else {
    status = 'Unknown Quote';
  }

  return {
      status: status,
    };
  }

}
