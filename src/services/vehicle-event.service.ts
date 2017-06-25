import { VehicleEvent } from '../interfaces';

export class VehicleEventService {
  private static events: Array<VehicleEvent> = new Array<VehicleEvent>();

  public static add(event: VehicleEvent): VehicleEvent {
    event.createdAt = new Date();

    let id = this.events.push(event);
    event.id = String(id);

    return event;
  }

  public static list(): Array<VehicleEvent> {
    return this.events.sort((a, b) => {
      return b.createdAt.getTime() - a.createdAt.getTime();
    });
  }
}
