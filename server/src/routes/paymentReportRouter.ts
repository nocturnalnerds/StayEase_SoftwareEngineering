import { Router } from "express";
import {generatePaymentReport} from "../controllers/PaymentController"

const paymentReport = Router();

paymentReport.get('/generateReport',generatePaymentReport);

export {paymentReport};