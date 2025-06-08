import { Router } from "express";
import {

getPendingHouseKeeperRooms,
getCompletedHouseKeeperRooms,
getMaintananceHouseKeeperRooms,
getAllRoomNumbers,
getAllHouseKeepingStaff,
addHouseKeepingTask,
updateHouseKeepingTaskStatus,
deleteHouseKeepingTask,
getHouseKeepingDashboardStats,
} from "../controllers/HouseKeepingController"; 

const houseKeepingRouter = Router();

houseKeepingRouter.get("/pending-rooms", getPendingHouseKeeperRooms);
houseKeepingRouter.get("/completed-rooms", getCompletedHouseKeeperRooms);
houseKeepingRouter.get("/maintanance-rooms", getMaintananceHouseKeeperRooms);
houseKeepingRouter.get("/room-numbers", getAllRoomNumbers);
houseKeepingRouter.get("/staff", getAllHouseKeepingStaff);
houseKeepingRouter.post("/task", addHouseKeepingTask);
houseKeepingRouter.patch("/task/status", updateHouseKeepingTaskStatus);
houseKeepingRouter.delete("/task", deleteHouseKeepingTask);
houseKeepingRouter.get("/dashboard-stats", getHouseKeepingDashboardStats);

export { houseKeepingRouter };