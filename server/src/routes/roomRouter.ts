import { Router } from "express";
import {
getAllRoomType,
getRoomTypeById,
addRoomTypes,
deleteRoomType,
getAllRooms,
getRoomById,
updateRoomAvailability,
updateRoomCleaningDate,
addNewRooms,
deleteRoom,
getRoomDashboardData,
updateRoomType,
updateRoom
} from "../controllers/RoomController";

const roomRouter = Router();

// Room Types
roomRouter.get("/room-types", getAllRoomType);
roomRouter.get("/room-types/:id", getRoomTypeById);
roomRouter.post("/room-types", ...addRoomTypes);
roomRouter.delete("/room-types/:id", deleteRoomType);
roomRouter.patch("/room-types/:id", updateRoomType);

// Rooms
roomRouter.get("/rooms", getAllRooms);
roomRouter.get("/rooms/:id", getRoomById);
roomRouter.post("/rooms", addNewRooms);
roomRouter.patch("/rooms/:id/availability", updateRoomAvailability);
roomRouter.patch("/rooms/:id/cleaning", updateRoomCleaningDate);
roomRouter.delete("/rooms/:id", deleteRoom);
roomRouter.patch("/rooms/:id", updateRoom);

//dashboard
roomRouter.get("/roomDashboard", getRoomDashboardData);

export {roomRouter};