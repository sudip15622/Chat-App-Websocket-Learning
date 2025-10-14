import { Vehicle } from "@/types/types";
import Homepage from "../components/Homepage";

export default async function Home() {
  let vehicles: Vehicle[] | null;
  try {
    const response = await fetch("http://localhost:4000/vehicle");

    if (!response.ok) {
      throw new Error("Cannot get all vehicles");
    };

    vehicles = await response.json();
  } catch (error) {
    console.error("Vehicles error: ", error);
    vehicles = null
  }

  if(!vehicles) {
    return (
      <div className="mt-20 mx-auto text-2xl font-semibold">
        No vehicles to show!
      </div>
    )
  }

  return (
    <Homepage vehicles={vehicles}/>
  );
}
