import { HistoryListRecord, HistoryRecord, VehicleEvent } from '../interfaces';
import { Setting } from './';
import * as moment from 'moment-timezone';
import * as request from 'request';

export class VehicleEventService {
  private static events: Array<VehicleEvent> = new Array<VehicleEvent>();

  public static add(event: VehicleEvent): VehicleEvent {
    let localTz = Setting.localTimeZone();

    event.createdAt = moment().tz(localTz).toDate();

    let id = this.events.push(event);
    event.id = String(id);

    return event;
  }

 public static addMessage(message: string): VehicleEvent {
   let event: VehicleEvent = {
      id: '',
      createdAt: null,
      description: message,
      recordedAt: null,
    };

    return this.add(event);
  }
  public static list(): Array<VehicleEvent> {
    return this.events.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }

  public static allEvents(): Promise<Array<HistoryRecord>> {
    return this.records();
  }

  private static records(): Promise<Array<HistoryRecord>> {
    let options = {
      method: 'GET',
      url: Setting.recordsUrl() + '?datastoreId=' + Setting.apiDatastoreId(),
      qs: { datastoreId: Setting.apiDatastoreId },
      headers: {
        'cache-control': 'no-cache',
        'x-api-key': Setting.apiKey(),
        'x-username': Setting.apiUserName(),
        'content-type': 'application/json',
      },
    };

    return new Promise( (resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }

        let promises = new Array<Promise<HistoryRecord>>();
        let json = JSON.parse(body);
        json.records.every( record => {
          promises.push(this.getRecord(record.id));
        });

        Promise.all(promises)
        .then(records => {
          resolve(records);
        });
      });
    });
  }

  private static getRecord(id: string): Promise<HistoryRecord> {
    let options = { method: 'GET',
      url: Setting.recordsUrl() + '/' + id,
      headers: {
        'cache-control': 'no-cache',
        'x-api-key': Setting.apiKey(),
        'x-username': Setting.apiUserName(),
        'content-type': 'application/json',
      },
    };

    return new Promise( (resolve, reject) => {
      request(options, (error, response, body) => {
        if (error) {
          reject(error);
          return;
        }

        let json = JSON.parse(body);
        if (!json || !json.data) {
          resolve(null);
          return;
        }

        let record: HistoryRecord = { id: '', type: '', odometer: 0, message: '', createdAt: null };

        record.id = id;
        record.createdAt = moment(parseInt(json.timestamp + '000', 10)).tz(Setting.localTimeZone()).toDate();
        record.message = json.data.description;
        if (json.data.odometer) {
          record.odometer = json.data.odometer;
        }

        if (json.data.type) {
          record.type = json.data.type;
        }

        if (json.data.location) {
          record.location = json.data.location;
        }

        resolve(record);
      });
    });


  }
}
