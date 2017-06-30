import * as express from 'express';
import { VehicleEventService } from '../services';

export class VehicleEventController {

  public static post(request: express.Request, response: express.Response) {
    let event = request.body.event;

    return response.send({ event: VehicleEventService.add(event)});
  }

  public static list(request: express.Request, response: express.Response) {
    let event = request.body.event;

    return response.send({ events: VehicleEventService.list()});
  }

  public static all(request: express.Request, response: express.Response) {
    let event = request.body.event;

    VehicleEventService.allEvents()
    .then( events => {
      events = events.filter( e => {
        return e.type && e.type.trim().length > 0;
      })
      .sort((a, b) => {
        return b.createdAt.getTime() - a.createdAt.getTime();
      });

      return response.send({ events: events });
    });
  }
}
