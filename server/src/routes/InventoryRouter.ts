import { Router } from "express";
import {

getAllInventory,
addInventoryItem,
toggleLastRestocked,
getAllInventoryTransactions,
createInventoryTransaction
} from "../controllers/InventoryController";

const inventoryRouter = Router();

// Inventory item routes
inventoryRouter.get("/inventory", getAllInventory);
inventoryRouter.post("/inventory", addInventoryItem);
inventoryRouter.patch("/inventory/:id/restock", toggleLastRestocked);

// Inventory transaction routes
inventoryRouter.get("/inventory/transactions", getAllInventoryTransactions);
inventoryRouter.post("/inventory/transactions", createInventoryTransaction);

export {inventoryRouter};