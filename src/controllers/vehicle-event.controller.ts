import * as express from 'express';
import { VehicleEventService } from '../services';

export class VehicleEventController {

  public static put(request: express.Request, response: express.Response) {
    let event = request.body.event;

    return response.send({ event: VehicleEventService.add(event)});
  }
}
