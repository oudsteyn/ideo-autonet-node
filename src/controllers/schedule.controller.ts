import * as express from 'express';
import { ScheduleService } from '../services';

export class ScheduleController {

  public static post(request: express.Request, response: express.Response) {
    let quoteId = request.body.quoteId;

    return response.send({ appointment: ScheduleService.appointment(quoteId)});
  }

}
