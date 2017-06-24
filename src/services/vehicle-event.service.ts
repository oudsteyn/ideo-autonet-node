import { VehicleEvent } from '../interfaces';

export class VehicleEventService {
  private static events: Array<VehicleEvent> = new Array<VehicleEvent>();

  public static add(event: VehicleEvent): VehicleEvent {
    let id = this.events.push(event);
    event.id = String(id);

    return event;
  }
}
