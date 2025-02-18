import express from "express";
import { createContactUs } from "../controllers";
import { authRouter } from "./authRouter";

const contactRouter = express.Router();

contactRouter.post('/contact',contactRouter);

export {contactRouter};