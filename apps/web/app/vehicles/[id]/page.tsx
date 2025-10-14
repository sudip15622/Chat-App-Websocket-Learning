// "use client"
import VehiclePage from "@/components/VehiclePage";
import React from "react";

interface PageProps {
  params: Promise<{
    id: string;
  }>;
}

const page = async ({ params }: PageProps) => {
  const { id } = await params;

  const response = await fetch (`http://localhost:4000/vehicle/${id}`);

  if(!response.ok) {
    return (
      <>
      <div className="text-2xl font-semibold mt-20 mx-auto">
        Vehicle not found!
      </div>
      </>
    )
  }

  const vehicle = await response.json();
  return (
    <>
      <VehiclePage vehicle={vehicle}/>
    </>
  );
};

export default page;
