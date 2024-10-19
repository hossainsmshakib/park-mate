export interface Vehicle {
  id: string;
  licenseNumber: string;
  vehicleType: "Car" | "Microbus" | "Truck" | "";
  ownerName: string;
  ownerPhone: string;
  ownerAddress: string;
  entryTime: string;
  exitTime: string;
  status: "in" | "out";
}
