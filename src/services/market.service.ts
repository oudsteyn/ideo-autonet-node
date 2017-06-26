import { Part, Quote, QuoteRequest } from '../interfaces';
import { Setting } from './';
import * as moment from 'moment-timezone';

export class MarketService {

  private static quotes: Array<Quote> = new Array<Quote>();

  public static get(id: number): Quote {
    return this.quotes.find( item => {
      return item.id === id;
    });
  }
  public static quote(request: QuoteRequest): Array<Quote> {
    let localTz = Setting.localTimeZone();

    let part: Part = {
						manufacture: 'Volvo',
						number: '30756213',
            description: 'Airbag',
					};

    let quote1: Quote = {
      id: 0,
      vehicle: request.vehicle,
      cost: 400.00,
      scheduleDate: moment().tz(localTz).add(5, 'minutes').toDate(),
      expiresAt: moment().tz(localTz).add(15, 'minutes').toDate(),
      distance: 5,
      estimatedTimeInShop: 90,
      repairLocation: {
        id: 0,
        name: 'Fonzies Garage',
        address: '80 Prospect St',
        city: 'Cambridge',
        state: 'MA',
        zip: '02139',
        location: {
          latitude: 42.3670826,
			    longitude: -71.1047005,
        },
      },
      parts: [part],
    };

    let id = this.quotes.push(quote1);
    quote1.id = id;

    let quote2: Quote = {
      id: 0,
      vehicle: request.vehicle,
      cost: 300.00,
      scheduleDate: moment().tz(localTz).add(1, 'days').toDate(),
      expiresAt: moment().tz(localTz).add(60, 'minutes').toDate(),
      distance: 1584,
      estimatedTimeInShop: 45,
      repairLocation: {
        id: 1,
        name: 'Foreign Auto Center, Inc.',
        address: '251 Prospect St',
        city: 'Cambridge',
        state: 'MA',
        zip: '02139',
        location: {
          latitude: 42.3690448,
			    longitude: -71.1034625,
        },
      },
      parts: [part],
    };

    id = this.quotes.push(quote2);
    quote2.id = id;

    return new Array<Quote>(quote1, quote2);
  }

}
