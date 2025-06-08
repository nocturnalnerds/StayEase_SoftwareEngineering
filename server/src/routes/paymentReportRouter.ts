import { Router } from "express";
import {generatePaymentReport} from "../controllers/PaymentController"
import { getDashboardStats } from "../controllers/PaymentController";
import { getAllPayments } from "../controllers/PaymentController";

const paymentReport = Router();

paymentReport.get('/generateReport',generatePaymentReport);
paymentReport.get('/dashboardStats', getDashboardStats);
paymentReport.get('/all', getAllPayments);
export {paymentReport};