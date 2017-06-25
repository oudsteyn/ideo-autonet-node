import * as express from 'express';
import { WorkOrderService } from '../services';

export class WorkOrderController {

  public static get(request: express.Request, response: express.Response, id: any) {
    let woId: number = parseInt(<string>id, 10);
    return response.send({ workOrder: WorkOrderService.get(woId) });
  }

 public static list(request: express.Request, response: express.Response) {
    return response.send({ workOrders: WorkOrderService.list() });
  }

  public static listOpen(request: express.Request, response: express.Response) {
    return response.send({ workOrders: WorkOrderService.listOpen() });
  }

  public static put(request: express.Request, response: express.Response) {
    let id = request.body.workOrder.id;
    let status = request.body.workOrder.status;

    return response.send({ workOrder: WorkOrderService.setStatus(id, status) });
  }
}
