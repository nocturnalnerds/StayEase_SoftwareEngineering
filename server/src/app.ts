import express from "express";
import cors from "cors";

import {
  authRouter,
  contactRouter,
  roomRouter,
  fnbRouter,
  userRouter,
  discountRouter,
} from "./routes";
import { AppError } from "./utils/http/AppError";
import { STATUS } from "./utils/http/statusCodes";
import { ErrorController } from "./controllers";
import { frontOfficeRouter } from "./routes/frontOfficeRouter";
import { paymentReport } from "./routes/paymentReportRouter";
import { restaurantRouter } from "./routes/restaurantRouter";
import { houseKeepingRouter } from "./routes/houseKeepingRouter";

const app = express();

/**
 * Enable Cross-Origin Resource Sharing (CORS) for all routes
 * This allows your API to be accessed from different domains
 */
app.use(cors());

/**
 * Middleware to parse incoming JSON requests
 * This allows you to access the request body as `request.body`
 */
app.use(express.json());

/**
 * Register all application routes
 * This includes all the endpoints defined in the router
 */
app.use("/auth", authRouter);
app.use("/rooms", roomRouter);
app.use("/fnb", fnbRouter);
app.use("/users", userRouter);
app.use("/discount", discountRouter);
app.use("/front-office", frontOfficeRouter);
app.use("/payment", paymentReport);
app.use("/housekeeping", houseKeepingRouter);
app.use("/restaurant", restaurantRouter);
app.use(contactRouter);

/**
 * Handle requests to undefined routes
 * If a route is not found, throw an AppError with a 404 status code
 */
app.use("*", (_, __, next) => {
  next(new AppError("Route not found", STATUS.NOT_FOUND));
});

/**
 * Global error handling middleware
 * This will catch all errors and send an appropriate response to the client
 */
app.use(ErrorController);

export default app;
