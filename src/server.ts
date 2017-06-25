import { MarketController, ScheduleController, VehicleEventController, WorkOrderController } from './controllers';
import { Setting, StatusCodes } from './services';

import * as bodyParser from 'body-parser';
import * as express from 'express';

require('dotenv-extended').load();

export class Server {
  private _app: express.Application;
  private _apiKey: string;

  constructor(app?: express.Application) {
    this._apiKey = Setting.apiKey();
    this._app = app || express();
    this._app.use(bodyParser.json());
  }


  public setRoutes() {
    console.log('setting up server routes');

    this._app.get('/api/ping', (req: express.Request, res: express.Response) => this.pingResponse(req, res));

    this._app.post('/api/vehicle/event', this.validateApiKey,
      (req: express.Request, res: express.Response) => VehicleEventController.post(req, res));

    this._app.get('/api/vehicle/event', this.validateApiKey,
      (req: express.Request, res: express.Response) => VehicleEventController.list(req, res));

    this._app.post('/api/market/quote', this.validateApiKey,
      (req: express.Request, res: express.Response) => MarketController.quote(req, res));

    this._app.post('/api/schedule/repair', this.validateApiKey,
      (req: express.Request, res: express.Response) => ScheduleController.post(req, res));


/*
    this._app.get('/api/work-order', this.validateApiKey,
      (req: express.Request, res: express.Response) => WorkOrderController.allOpen(req, res));

    this._app.put('/api/work-order/:id',
      (req: express.Request, res: express.Response) => WorkOrderController.single(req, res, req.params.id));

    this._app.put('/api/work-order', this.validateApiKey,
      (req: express.Request, res: express.Response) => WorkOrderController.put(req, res));
*/

    this._app.use(this.logErrors);
    this._app.use(this.clientErrorHandler);
    this._app.use(this.errorHandler);
  }

  public start() {
    console.log('starting up server');
    this.setupWorkers();

    let port = Setting.serverPort();

    this._app.listen(port, () => {
      console.log(`app server is listening on port ${port}.`);
    });
  }

  private setupWorkers() {
    console.log('initializing workers');
  }

  private validateApiKey(req, res, next) {
    let apiKey = Setting.apiKey();
    let header = req.get('X-Api-Key');

    if (apiKey && apiKey.length > 10 && apiKey === header) {
      next();

    } else {
      res.status(StatusCodes.UNAUTHORIZED).json({ message: 'Missing or invalid api key' });
    }
  }

  private pingResponse(req: express.Request, res: express.Response) {
    res.send({ message: 'service is alive' });
  }

  private logErrors(err, req, res, next) {
    console.error(err.stack);
    next(err);
  }

  private clientErrorHandler(err, req, res, next) {
    if (req.xhr) {
      res.status(StatusCodes.INTERNAL_SERVER_ERROR).send({ message: err });

    } else {
      next(err);
    }
  }

  private errorHandler(err, req, res, next) {
    res.status(StatusCodes.INTERNAL_SERVER_ERROR);
    res.render('error', { error: err });
  }
}
