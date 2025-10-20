import { Body, Controller, Post } from "@nestjs/common";
import { BookingService } from "./booking.service";
import { CreateBookingDto } from "src/types/types";
import { BookingGateway } from "./booking.gateway";

@Controller("booking")
export class BookingController {
    constructor (
        private bookingService: BookingService,
        private bookingGateway: BookingGateway,
    ) {}

    @Post("create")
    handleBookingCreation (@Body() createBookingDto: CreateBookingDto) {
        const vehicle = this.bookingService.create(createBookingDto);

        this.bookingGateway.broadcastStatusChange(vehicle);

        return {
            success: true,
            message: "Successfully booked vehicle!",
        }
    }
}