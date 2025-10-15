import { CustomFormState, LoginFormData } from "@/types/types";
import { createSession, getSession } from "./session";

export async function handleLogin (formData: LoginFormData): Promise<CustomFormState> {
    try {
        const response = await fetch ("http://localhost:4000/auth/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                email: formData.email,
                password: formData.password,
            })
        })

        const dataOrError = await response.json();

        if(!response.ok) {
            if(response.status === 401) {
                return {
                    success: false,
                    message: "Invalid Credentails!",
                }
            }
            throw new Error("Login failed from backend: ", dataOrError);
        }

        await createSession({
            access_token: dataOrError.access_token,
        })

        return {
            success: true,
            message: "Logged in successfully!",
        }
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to login!",
        }
    }
}

export async function handleBookVehicle (vehicleId: string): Promise<CustomFormState> {
    const session = await getSession();
    if(!session) {
        return {
            success: false,
            message: "Login to book vehicle!",
        }
    }
    try {
        const response = await fetch("http://localhost:4000/booking/create", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${session}`
            },
            body: JSON.stringify({
                vehicleId: vehicleId
            })
        })

        const dataOrError = await response.json();
        console.log(dataOrError);

        if(!response.ok) {
            if(response.status === 404) {
                return {
                    success: false,
                    message: "Vehicle not found!",
                }
            }
            if(response.status === 401) {
                return {
                    success: false,
                    message: "Access denied!",
                }
            }
            if(response.status === 409) {
                return {
                    success: false,
                    message: "Vehicle is already booked by another user!",
                }
            }
            throw new Error("Booking failed from backend: ", dataOrError);
        }

        return dataOrError as CustomFormState;
    } catch (error) {
        console.error(error);
        return {
            success: false,
            message: "Failed to book vehicle!",
        }
    }
}