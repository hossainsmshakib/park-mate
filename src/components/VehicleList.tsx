"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import VehicleForm from "./VehicleForm";
import { Vehicle } from "../utils/types";
import { FaEdit, FaPlus } from "react-icons/fa";

const VehicleList = () => {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [vehicleToEdit, setVehicleToEdit] = useState<Vehicle | null>(null);

  const fetchVehicles = async () => {
    const response = await axios.get<Vehicle[]>(
      "http://localhost:3001/vehicles"
    );
    setVehicles(response.data);
  };

  useEffect(() => {
    fetchVehicles();
  }, []);

  const handleAddVehicle = (newVehicle: Vehicle) => {
    setVehicles((prevVehicles) => [...prevVehicles, newVehicle]);
  };

  const handleEditVehicle = (vehicle: Vehicle) => {
    setVehicleToEdit(vehicle);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setVehicleToEdit(null);
  };

  const handleVehicleUpdated = (updatedVehicle: Vehicle) => {
    setVehicles((prevVehicles) =>
      prevVehicles.map((vehicle) =>
        vehicle.id === updatedVehicle.id ? updatedVehicle : vehicle
      )
    );
  };

  const formatDateTime = (dateTime: string | undefined) => {
    if (!dateTime) return "N/A";
    const options: Intl.DateTimeFormatOptions = {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    };
    return new Date(dateTime).toLocaleString("en-US", options);
  };

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Vehicle List</h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="border border-blue-600 text-blue-600 px-4 py-2 rounded transition duration-300 flex items-center hover:bg-blue-600 hover:text-white"
        >
          <FaPlus className="mr-2" /> Add Vehicle
        </button>
      </div>
      <table className="min-w-full mt-4 border border-gray-300 rounded-lg overflow-hidden">
        <thead className="bg-gradient-to-r from-blue-500 to-blue-700 text-white">
          <tr>
            <th className="border border-gray-300 p-3 text-center">
              License Number
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Vehicle Type
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Owner Name
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Owner Phone
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Owner Address
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Entry Time
            </th>
            <th className="border border-gray-300 p-3 text-center">
              Exit Time
            </th>
            <th className="border border-gray-300 p-3 text-center">Status</th>
            <th className="border border-gray-300 p-3 text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {vehicles.map((vehicle, index) => (
            <tr
              key={vehicle.id}
              className={`transition duration-300 ${
                index % 2 === 0 ? "bg-blue-50" : "bg-white"
              } hover:bg-blue-100`}
            >
              <td className="border border-gray-300 p-2 text-left">
                {vehicle.licenseNumber}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {vehicle.vehicleType}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {vehicle.ownerName}
              </td>
              <td className="border border-gray-300 p-2 text-left">
                {vehicle.ownerPhone}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {vehicle.ownerAddress}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {formatDateTime(vehicle.entryTime)}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {vehicle.exitTime ? formatDateTime(vehicle.exitTime) : "N/A"}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                {vehicle.status}
              </td>
              <td className="border border-gray-300 p-2 text-center">
                <button
                  onClick={() => handleEditVehicle(vehicle)}
                  className="bg-green-600 text-white px-2 py-1 rounded flex items-center"
                >
                  <FaEdit className="mr-1" /> Update
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isModalOpen && (
        <VehicleForm
          onClose={handleCloseModal}
          vehicleToEdit={vehicleToEdit}
          onVehicleAdded={handleAddVehicle}
          onVehicleUpdated={handleVehicleUpdated}
        />
      )}
    </div>
  );
};

export default VehicleList;
