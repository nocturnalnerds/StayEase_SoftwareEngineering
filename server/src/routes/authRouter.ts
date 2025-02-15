import express from "express";

const authRouter = express.Router();

import {login, register} from "../controllers/AuthController";

authRouter.post('/login',login);
authRouter.post('/register',register);

export {authRouter};