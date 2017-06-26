import { VehicleEvent } from '../interfaces';
import { Setting } from './';
import * as moment from 'moment-timezone';

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
}
