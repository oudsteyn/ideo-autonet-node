export interface Appointment {
  status: string;
}
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
  vin: string;
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
  description: string;
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

export interface Service {
  type: string;
  parts: Array<Part>;
  critera: Array<Critera>;
}

export interface QuoteRequest {
  location: GeoCoordinate;
  vehicle: Vehicle;
  services: Array<Service>;
}

export interface Quote {
  id: number;
  vehicle: Vehicle;
  cost: number;
  scheduleDate: Date;
  expiresAt: Date;
  distance: number;
  estimatedTimeInShop: number;
  repairLocation: RepairLocation;
  parts: Array<Part>;
}

export interface RepairLocation {
  id: number;
  name: string;

  address: string;
  city: string;
  state: string;
  zip: string;
  location: GeoCoordinate;
}

export interface GeoCoordinate {
  latitude: number;
  longitude: number;
}

export interface WorkOrder {
      id: number;
      status: string;
      createdAt: Date;
      vehicle: Vehicle;
      scheduledDate: Date;
      laborCost: number;
      items: Array<WorkOrderItem>;
}
