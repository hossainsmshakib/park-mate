"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { Vehicle } from "../utils/types";
import { FaCar, FaBus, FaTruck } from "react-icons/fa";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const Dashboard = () => {
  const [totalVehicles, setTotalVehicles] = useState(0);
  const [emptySlots, setEmptySlots] = useState(0);
  const [vehicleTypeCount, setVehicleTypeCount] = useState<{
    Car: number;
    Microbus: number;
    Truck: number;
  }>({ Car: 0, Microbus: 0, Truck: 0 });

  const fetchDashboardData = async () => {
    const response = await axios.get<Vehicle[]>(
      "http://localhost:3001/vehicles"
    );
    const vehicles = response.data;
    setTotalVehicles(vehicles.length);
    setEmptySlots(1000 - vehicles.length);
    const counts = vehicles.reduce((acc: any, vehicle: Vehicle) => {
      acc[vehicle.vehicleType] = (acc[vehicle.vehicleType] || 0) + 1;
      return acc;
    }, {});
    setVehicleTypeCount(counts);
  };

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const data = {
    labels: ["Cars", "Microbuses", "Trucks"],
    datasets: [
      {
        label: "Vehicle Types",
        data: [
          vehicleTypeCount.Car || 0,
          vehicleTypeCount.Microbus || 0,
          vehicleTypeCount.Truck || 0,
        ],
        backgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
        hoverBackgroundColor: ["#FF6384", "#36A2EB", "#FFCE56"],
      },
    ],
  };

  return (
    <div className="p-6 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-red-500 text-white p-5 rounded-lg flex items-center transition-transform transform hover:scale-105">
          <FaCar className="text-4xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Total Vehicles</h3>
            <p className="text-2xl">{totalVehicles}</p>
          </div>
        </div>
        <div className="bg-green-500 text-white p-5 rounded-lg flex items-center transition-transform transform hover:scale-105">
          <FaBus className="text-4xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Empty Slots</h3>
            <p className="text-2xl">{emptySlots}</p>
          </div>
        </div>
        <div className="bg-blue-500 text-white p-5 rounded-lg flex items-center transition-transform transform hover:scale-105">
          <FaTruck className="text-4xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Total Slots</h3>
            <p className="text-2xl">1000</p>
          </div>
        </div>
      </div>
      <div className="bg-white p-5 rounded-lg flex justify-center items-center">
        <div className="w-full max-w-xs">
          <Pie data={data} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
        <div className="bg-red-300 text-gray-800 p-5 rounded-lg flex items-center transition-transform transform hover:scale-105">
          <FaCar className="text-4xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Cars</h3>
            <p className="text-2xl">{vehicleTypeCount.Car || 0}</p>
          </div>
        </div>
        <div className="bg-green-300 text-gray-800 p-5 rounded-lg flex items-center transition-transform transform hover:scale-105">
          <FaBus className="text-4xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Microbuses</h3>
            <p className="text-2xl">{vehicleTypeCount.Microbus || 0}</p>
          </div>
        </div>
        <div className="bg-blue-300 text-gray-800 p-5 rounded-lg flex items-center transition-transform transform hover:scale-105">
          <FaTruck className="text-4xl mr-4" />
          <div>
            <h3 className="font-semibold text-lg">Trucks</h3>
            <p className="text-2xl">{vehicleTypeCount.Truck || 0}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
