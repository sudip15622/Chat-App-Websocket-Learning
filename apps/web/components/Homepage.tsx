"use client";
import React, {useEffect, useState} from "react";
import Link from "next/link";

interface Vehicle {
    id: string;
    name: string;
    status: string;
}

interface HomepageProps {
    vehicles: Vehicle[]
}

const Homepage = ({vehicles}: HomepageProps) => {
    
  return (
    <div className="w-full max-w-5xl mx-auto mt-20">
      <h2 className="text-2xl font-semibold">All Vehicles</h2>
      <ul className="flex flex-row items-stretch gap-x-5">
        {vehicles.map((vehicle) => {
          return (
            <div
              key={vehicle.id}
              className="p-4 flex flex-1 flex-col gap-y-10 rounded-2xl shadow-lg"
            >
              <div className="text-lg font-semibold">{vehicle.name}</div>
              <div className="w-fit px-2 py-1 text-xs bg-green-500 text-white rounded-2xl">
                {vehicle.status}
              </div>
              <Link
                href={`/vehicles/${vehicle.id}`}
                className="w-full bg-blue-500 text-center text-white rounded-2xl px-5 py-2 hover:bg-blue-700 transition-colors duration-200 ease-in-out"
              >
                View Details
              </Link>
            </div>
          );
        })}
      </ul>
    </div>
  );
};

export default Homepage;
