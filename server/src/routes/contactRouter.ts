import express from "express";
import { createContactUs } from "../controllers";

const contactRouter = express.Router();

contactRouter.post('/contact',createContactUs);

export {contactRouter};