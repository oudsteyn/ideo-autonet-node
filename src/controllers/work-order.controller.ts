import * as express from 'express';
import { WorkOrderService } from '../services';

export class WorkOrderController {

  public static allOpen(request: express.Request, response: express.Response) {
    return response.send({ workOrders: WorkOrderService.list() });
  }
  public static single(request: express.Request, response: express.Response) {
    return response.send({ workOrders: WorkOrderService.list() });
  }

  public static put(request: express.Request, response: express.Response) {
    return response.send({ workOrders: WorkOrderService.list() });
  }
}
