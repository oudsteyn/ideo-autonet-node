import * as express from 'express';
import { WorkOrderService, VehicleEventService } from '../services';

export class VehicleEquipmentController {

  public static post(request: express.Request, response: express.Response) {
    let change = request.body.change;

    let wo = WorkOrderService.firstInWorkingStatus();
    if (!wo) {
      response.status(400).send( { message: 'No ticket in Working status' });
      return;
    }

    if (change.tag === '82003CBA2226') {
      let message = 'invalid part change: Spec D Type 2 Airbag (SW-94150-BKB)';
      WorkOrderService.setAlert(wo.id, message);
      VehicleEventService.addMessage(message);
      response.status(400).send( { message: message });

      return;
    }

    WorkOrderService.clearAlert(wo.id);
    WorkOrderService.setStatus(wo.id, 'Paid');

    VehicleEventService.addMessage('part change: Genuine Volvo Airbag (30756213)');
    return response.send({ change: 'changed'});
  }


}
