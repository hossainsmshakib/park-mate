import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Vehicle } from "../../utils/types";

interface VehicleState {
  vehicles: Vehicle[];
}

const initialState: VehicleState = {
  vehicles: [],
};

const vehicleSlice = createSlice({
  name: "vehicles",
  initialState,
  reducers: {
    setVehicles: (state, action: PayloadAction<Vehicle[]>) => {
      state.vehicles = action.payload; 
    },
    addVehicle: (state, action: PayloadAction<Vehicle>) => {
      state.vehicles.push(action.payload);
    },
    updateVehicle: (state, action: PayloadAction<Vehicle>) => {
      const index = state.vehicles.findIndex(
        (vehicle) => vehicle.licenseNumber === action.payload.licenseNumber
      );
      if (index !== -1) {
        state.vehicles[index] = action.payload; 
      }
    },
  },
});

export const { setVehicles, addVehicle, updateVehicle } = vehicleSlice.actions;

export default vehicleSlice.reducer;
