import { Router } from "express";
import {

getAllDiscount,
createDiscountRate,
updateDiscountRate,
editDiscountRate,
deleteDiscountRate,
} from "../controllers/DiscountController";

const discountRouter = Router();

discountRouter.get("/", getAllDiscount);
discountRouter.post("/", createDiscountRate);
discountRouter.put("/", updateDiscountRate);
discountRouter.patch("/", editDiscountRate);
discountRouter.delete("/", deleteDiscountRate);

export {discountRouter};