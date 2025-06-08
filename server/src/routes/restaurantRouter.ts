import { Router } from "express";
import {

getAllFoodOrders,
getFoodOrderById,
getAllFoodItems,
addFoodOrder,
updateFoodOrderStatus,
getDashboardStats
} from "../controllers/RestaurantController";

const restaurantRouter = Router();

restaurantRouter.get("/orders", getAllFoodOrders);
restaurantRouter.get("/orders/:id", getFoodOrderById);
restaurantRouter.get("/items", getAllFoodItems);
restaurantRouter.post("/orders", addFoodOrder);
restaurantRouter.patch("/orders/status", updateFoodOrderStatus);
restaurantRouter.get("/dashboard/stats", getDashboardStats);

export {restaurantRouter};