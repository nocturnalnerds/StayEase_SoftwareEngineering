import { Router } from "express";
import {

getAllDiscount,
createDiscountRate,
updateDiscountRate,
editDiscountRate,
deleteDiscountRate,
searchDiscountByName
} from "../controllers/DiscountController";

const discountRouter = Router();

discountRouter.get("/", getAllDiscount);
discountRouter.post("/", createDiscountRate);
discountRouter.put("/", updateDiscountRate);
discountRouter.patch("/", editDiscountRate);
discountRouter.delete("/", deleteDiscountRate);
discountRouter.get("/search", searchDiscountByName);

export {discountRouter};