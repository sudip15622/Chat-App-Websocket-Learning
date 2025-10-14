"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { io, Socket } from "socket.io-client";

interface VehiclePageProps {
  vehicle: {
    id: string;
    name: string;
    status: string;
  };
}

const VehiclePage = ({ vehicle }: VehiclePageProps) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<string>(vehicle.status);

  useEffect(() => {
    const newSocket = io("http://localhost:3001/booking");
    setSocket(newSocket);
    newSocket.on("connect", () => {
      newSocket.emit("joinRoom", vehicle.id);
    });

    newSocket.on("bookingError", (data) => {
      alert(data.message);
    });

    newSocket.on("bookingSuccess", (data) => {
      alert(data.message);
    });

    newSocket.on("vehicleStatusChanged", (data) => {
      setStatus(data.status);
    });

    return () => {
      newSocket.off("connect");
      newSocket.off("bookingError");
      newSocket.off("bookingSuccess");
      newSocket.off("vehicleStatusChanged");
      newSocket.disconnect();
    };
  }, [vehicle.id]);

  const handleBook = () => {
    if (status === "booked") {
      alert("Already booked by another user!");
    }

    if (socket) {
      socket.emit("bookVehicle", vehicle.id);
    }
  };

  return (
    <div
      key={vehicle.id}
      className="p-4 flex flex-1 flex-col gap-y-10 rounded-2xl shadow-lg w-sm mx-auto mt-20"
    >
      <div className="text-lg font-semibold">{vehicle.name}</div>
      <div
        className={`w-fit px-2 py-1 text-xs text-white rounded-2xl ${
          status === "available" ? "bg-green-500" : "bg-red-500"
        }`}
      >
        {status}
      </div>
      <button
        onClick={handleBook}
        disabled={status === "booked"}
        className={`cursor-pointer w-full text-center text-white rounded-2xl px-5 py-2 transition-colors duration-200 ease-in-out ${
          status === "booked"
            ? "bg-gray-400 cursor-not-allowed"
            : "bg-blue-500 hover:bg-blue-700"
        }`}
      >
        {status === "booked" ? "Already Booked" : "Book Now"}
      </button>
    </div>
  );
};

export default VehiclePage;
