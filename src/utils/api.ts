import axios from "axios";
import { Vehicle } from "./types";

const API_URL = "http://localhost:3001/vehicles";

export const fetchVehicles = async (): Promise<Vehicle[]> => {
  const response = await axios.get<Vehicle[]>(API_URL);
  return response.data;
};

export const addVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  const response = await axios.post<Vehicle>(API_URL, vehicle);
  return response.data;
};

export const updateVehicle = async (vehicle: Vehicle): Promise<Vehicle> => {
  const response = await axios.put<Vehicle>(
    `${API_URL}/${vehicle.id}`,
    vehicle
  );
  return response.data;
};
