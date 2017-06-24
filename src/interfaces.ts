
export interface VehicleEvent {
  id: string;
  createdAt: Date;
  description: string;
  recordedAt: Date;
}

export interface Vehicle {
  year: number;
  make: string;
  model: string;
  licensePlate: string;
  odometer: number;
}

export interface OwnedVehicle extends Vehicle {
  paymentMethod: PayMethod;
  maxAutoRepairAmount: number;
  useGenericsWhenAvailable: boolean;
}

export interface Person {
  firstName: string;
  lastName: string;
  street: string;

  vechicles: Array<OwnedVehicle>;
}

export interface PayMethod {
  type: string;
  name: string;
  accountNumber: string;
  expirationDate: Date;
  cvcNumber: string;

}

export interface Customer extends Person {
  autoPay: boolean;
  paymentMethod: PayMethod;
}

export interface Part {
  manufacture: string;
  number: string;
  description; string;
}

export interface VehiclePart extends Part {
  rfidTag: string;
}


export interface WorkOrderItem {
  quantity: number;
  part: VehiclePart;
  cost: number;
}

export interface Critera {
  type: string;
  rule: string;
}
export interface QuoteRequest {

  parts: Array<Part>;
  critera: Array<Critera>;
}
export interface Quote {
  id: number;
  cost: number;
  scheduleDate: Date;
  expiresAt: Date;
}

export interface WorkOrder {
      id: number;

      createdAt: Date;

      customer: Person;
      vehicle: Vehicle;

      scheduledDate: Date;

      laborCost: number;

      items: Array<WorkOrderItem>;
}
