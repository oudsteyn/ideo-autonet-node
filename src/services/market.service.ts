import { Quote, QuoteRequest } from '../interfaces';
import * as moment from 'moment-timezone';

export class MarketService {

  private static quotes: Array<Quote> = new Array<Quote>();

  public static quote(request: QuoteRequest): Array<Quote> {
    let quote1: Quote = {
      id: 0,
      cost: 400,
      scheduleDate: moment().tz('America/New_York').add(1.5, 'hours').toDate(),
      expiresAt: moment().tz('America/New_York').add(15, 'minutes').toDate(),
    };

    let id = this.quotes.push(quote1);
    quote1.id = id;

    let quote2: Quote = {
      id: 0,
      cost: 300,
      scheduleDate: moment().tz('America/New_York').add(2, 'days').toDate(),
      expiresAt: moment().tz('America/New_York').add(60, 'minutes').toDate(),
    };

    id = this.quotes.push(quote2);
    quote2.id = id;

    return new Array<Quote>(quote1, quote2);
  }

}
