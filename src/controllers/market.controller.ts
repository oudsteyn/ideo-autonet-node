import * as express from 'express';
import { MarketService } from '../services';

export class MarketController {

  public static quote(request: express.Request, response: express.Response) {
    let req = request.body.request;

    return response.send({ quotes: MarketService.quote(req)});
  }

}
