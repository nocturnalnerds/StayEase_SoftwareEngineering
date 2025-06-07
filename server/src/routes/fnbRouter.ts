import { Router } from "express";
import {

getAllMenus,
getMenuById,
addMenu,
getMenusByCategory,
addFoodCategory,
getAllCategories,
getMenuByName,
getRestaurantDashboard
} from "../controllers/FnBController";

const fnbRouter = Router();

fnbRouter.get("/menus", getAllMenus);
fnbRouter.get("/menus/:id", getMenuById);
fnbRouter.post("/menus", ...addMenu);
fnbRouter.get("/menus/category/:category", getMenusByCategory);

fnbRouter.post("/categories", addFoodCategory);
fnbRouter.get("/categories", getAllCategories);
fnbRouter.get("/menus/name/:name", getMenuByName);

fnbRouter.get("/fnbDashboard", getRestaurantDashboard);

export {fnbRouter};