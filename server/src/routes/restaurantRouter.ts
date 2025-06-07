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
} from "../controllers/RestaurantController";

const router = Router();

router.get("/menus", getAllMenus);
router.get("/menus/:id", getMenuById);
router.post("/menus", ...addMenu);
router.get("/menus/category/:category", getMenusByCategory);

router.post("/categories", addFoodCategory);
router.get("/categories", getAllCategories);
router.get("/menus/name/:name", getMenuByName);

router.get("/fnbDashboard", getRestaurantDashboard);

export default router;