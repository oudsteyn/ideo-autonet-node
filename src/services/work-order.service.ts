import { Quote, WorkOrder, WorkOrderItem } from '../interfaces';
import { MarketService, Setting } from './';
import * as moment from 'moment-timezone';

export class WorkOrderService {
  private static workOrders: Array<WorkOrder> = new Array<WorkOrder>();

  public static create(quote: Quote): WorkOrder {

    let localTz = Setting.localTimeZone();

    let partCost = 258.58;
    let labor = quote.cost - partCost;

    let item: WorkOrderItem = {
      quantity: 1,
      part: {
        manufacture: 'Volvo',
        number: '30756213',
        description: 'Airbag',
        rfidTag: '',
      },
      cost: partCost,
    };

    let workOrder: WorkOrder = {
      id: 0,
      status: 'Open',
      createdAt: moment().tz(localTz).toDate(),
      vehicle: quote.vehicle,
      scheduledDate: quote.scheduleDate,
      laborCost: labor,
      alert: '',
      items: new Array<WorkOrderItem>(item),
    };

    let id = this.workOrders.push(workOrder);
    workOrder.id = id;

    return workOrder;
  }

  public static list(): Array<WorkOrder> {
    return this.workOrders;
  }

  public static listOpen(): Array<WorkOrder> {
    return this.workOrders.filter( wo => {
      return wo.status === 'Open' || wo.status === 'Working';
    });
  }

  public static get(id: number): WorkOrder {
    return this.workOrders.find( wo => {
      return wo.id === id;
    });
  }

  public static firstInWorkingStatus(): WorkOrder {
    return this.workOrders.find( wo => {
      return wo.status === 'Working';
    });
  }

  public static setAlert(id: number, message: string): WorkOrder {
    let workOrder = this.get(id);
    if (workOrder) {
      workOrder.alert = message;
    }

    return workOrder;
  }

  public static clearAlert(id: number): WorkOrder {
    let workOrder = this.get(id);
    if (workOrder) {
      workOrder.alert = '';
    }

    return workOrder;
  }
  public static setStatus(id: number, status: string): WorkOrder {
    let workOrder = this.get(id);
    if (workOrder) {
      workOrder.status = status;
    }

    return workOrder;
  }
}
