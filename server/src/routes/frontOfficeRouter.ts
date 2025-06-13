import { Router } from "express";
import {

getDiscountRate,
newReservation,
getReservationsData,
getConfirmedReservationsData,
updatePaymentStatus,
updateCheckInStatus,
searchReservationsByGuestName,
searchConfirmedReservationsByGuestName,
updateReservation,
getRoomList,
getDashboardStats,
deleteReservation,
} from "../controllers/FrontOfficeController";

const frontOfficeRouter = Router();

frontOfficeRouter.get("/discount-rate", getDiscountRate);
frontOfficeRouter.post("/reservation", newReservation);
frontOfficeRouter.get("/reservations", getReservationsData);
frontOfficeRouter.get("/reservations/confirmed", getConfirmedReservationsData);
frontOfficeRouter.patch("/reservation/payment-status", updatePaymentStatus);
frontOfficeRouter.patch("/reservation/checkin-status", updateCheckInStatus);
frontOfficeRouter.get("/reservations/search", searchReservationsByGuestName);
frontOfficeRouter.get("/reservations/confirmed/search", searchConfirmedReservationsByGuestName);
frontOfficeRouter.patch("/reservation", updateReservation);
frontOfficeRouter.get("/rooms", getRoomList);
frontOfficeRouter.get("/dashboard-stats", getDashboardStats);
frontOfficeRouter.delete("/reservation/:id", deleteReservation);
export {frontOfficeRouter};