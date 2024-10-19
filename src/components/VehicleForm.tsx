"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Vehicle } from "../utils/types";
import {
  FaCar,
  FaUser,
  FaPhone,
  FaMapMarkerAlt,
  FaCalendarAlt,
} from "react-icons/fa";

interface VehicleFormProps {
  onClose: () => void;
  vehicleToEdit?: Vehicle | null;
  onVehicleAdded: (vehicle: Vehicle) => void;
  onVehicleUpdated: (vehicle: Vehicle) => void;
}

const getCurrentTimeInBangladesh = () => {
  const now = new Date();
  const bangladeshOffset = 6 * 60;
  const bangladeshTime = new Date(now.getTime() + bangladeshOffset * 60 * 1000);
  return bangladeshTime.toISOString().slice(0, 16);
};

const VehicleForm = ({
  onClose,
  vehicleToEdit,
  onVehicleAdded,
  onVehicleUpdated,
}: VehicleFormProps) => {
  const [licenseNumber, setLicenseNumber] = useState<string>("");
  const [vehicleType, setVehicleType] = useState<
    "Car" | "Microbus" | "Truck" | ""
  >("");
  const [ownerName, setOwnerName] = useState<string>("");
  const [ownerPhone, setOwnerPhone] = useState<string>("");
  const [ownerAddress, setOwnerAddress] = useState<string>("");
  const [entryTime, setEntryTime] = useState<string>(
    getCurrentTimeInBangladesh()
  );
  const [exitTime, setExitTime] = useState<string>("");
  const [status, setStatus] = useState<"in" | "out">("in");
  const [formErrors, setFormErrors] = useState<string[]>([]);

  useEffect(() => {
    if (vehicleToEdit) {
      setLicenseNumber(vehicleToEdit.licenseNumber);
      setVehicleType(vehicleToEdit.vehicleType);
      setOwnerName(vehicleToEdit.ownerName);
      setOwnerPhone(vehicleToEdit.ownerPhone);
      setOwnerAddress(vehicleToEdit.ownerAddress);
      setEntryTime(vehicleToEdit.entryTime);
      setExitTime(vehicleToEdit.exitTime || "");
      setStatus(vehicleToEdit.status);
    } else {
      resetForm();
    }
  }, [vehicleToEdit]);

  const resetForm = () => {
    setLicenseNumber("");
    setVehicleType("");
    setOwnerName("");
    setOwnerPhone("");
    setOwnerAddress("");
    setEntryTime(getCurrentTimeInBangladesh());
    setExitTime("");
    setStatus("in");
  };

  const validateForm = () => {
    const errors: string[] = [];
    if (!licenseNumber) errors.push("License Number is required.");
    if (!vehicleType) errors.push("Please select a vehicle type.");
    if (!ownerName) errors.push("Owner Name is required.");
    if (!ownerPhone) errors.push("Owner Phone is required.");
    if (!ownerAddress) errors.push("Owner Address is required.");
    if (!entryTime) errors.push("Entry Time is required.");
    return errors;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errors = validateForm();
    if (errors.length > 0) {
      setFormErrors(errors);
      return;
    }

    const vehicleData: Vehicle = {
      id: vehicleToEdit ? vehicleToEdit.id : Date.now().toString(),
      licenseNumber,
      vehicleType,
      ownerName,
      ownerPhone,
      ownerAddress,
      entryTime,
      exitTime,
      status,
    };

    try {
      if (vehicleToEdit) {
        const response = await axios.put(
          `http://localhost:3001/vehicles/${vehicleToEdit.id}`,
          vehicleData
        );
        onVehicleUpdated(response.data);
      } else {
        const response = await axios.post(
          "http://localhost:3001/vehicles",
          vehicleData
        );
        onVehicleAdded(response.data);
      }

      resetForm();
      setFormErrors([]);
      onClose();
    } catch (error) {
      console.error("Error submitting vehicle data:", error);
      setFormErrors(["An error occurred while submitting the form."]);
    }
  };

  const handleExitTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newExitTime = e.target.value;
    setExitTime(newExitTime);
    if (newExitTime) {
      setStatus("out");
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg w-full max-w-3xl">
        <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
          {vehicleToEdit ? "Edit Vehicle" : "Add Vehicle"}
        </h2>
        {formErrors.length > 0 && (
          <div className="mb-4 text-red-500">
            {formErrors.map((error, index) => (
              <p key={index}>{error}</p>
            ))}
          </div>
        )}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                License Number
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <FaCar className="text-gray-500" />
                <input
                  type="text"
                  placeholder="License Number"
                  value={licenseNumber}
                  onChange={(e) => setLicenseNumber(e.target.value)}
                  required
                  className="flex-1 p-2 outline-none ml-2 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Vehicle Type
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <select
                  value={vehicleType}
                  onChange={(e) =>
                    setVehicleType(
                      e.target.value as "Car" | "Microbus" | "Truck"
                    )
                  }
                  required
                  className="flex-1 p-2 outline-none rounded-lg"
                >
                  <option value="" disabled>
                    Choose your vehicle
                  </option>
                  <option value="Car">Car</option>
                  <option value="Microbus">Microbus</option>
                  <option value="Truck">Truck</option>
                </select>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner Name
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <FaUser className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Owner Name"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  required
                  className="flex-1 p-2 outline-none ml-2 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner Phone
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <FaPhone className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Owner Phone"
                  value={ownerPhone}
                  onChange={(e) => setOwnerPhone(e.target.value)}
                  required
                  className="flex-1 p-2 outline-none ml-2 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Owner Address
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <FaMapMarkerAlt className="text-gray-500" />
                <input
                  type="text"
                  placeholder="Owner Address"
                  value={ownerAddress}
                  onChange={(e) => setOwnerAddress(e.target.value)}
                  required
                  className="flex-1 p-2 outline-none ml-2 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Entry Time
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <FaCalendarAlt className="text-gray-500" />
                <input
                  type="datetime-local"
                  value={entryTime}
                  onChange={(e) => setEntryTime(e.target.value)}
                  required
                  className="flex-1 p-2 outline-none ml-2 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Exit Time
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <FaCalendarAlt className="text-gray-500" />
                <input
                  type="datetime-local"
                  value={exitTime}
                  onChange={handleExitTimeChange}
                  className="flex-1 p-2 outline-none ml-2 rounded-lg"
                />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Status
              </label>
              <div className="flex items-center border border-gray-300 rounded-lg p-2 mt-1">
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value as "in" | "out")}
                  className="flex-1 p-2 outline-none rounded-lg"
                >
                  <option value="in">In</option>
                  <option value="out">Out</option>
                </select>
              </div>
            </div>
          </div>
          <div className="flex justify-between mt-6">
            <button
              type="submit"
              className="bg-blue-600 text-white px-4 py-2 rounded-lg w-full hover:bg-blue-700 transition duration-300 mr-2"
            >
              {vehicleToEdit ? "Update Vehicle" : "Add Vehicle"}
            </button>
            <button
              onClick={onClose}
              className="bg-red-600 text-white px-4 py-2 rounded-lg w-full hover:bg-red-700 transition duration-300"
            >
              Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default VehicleForm;
