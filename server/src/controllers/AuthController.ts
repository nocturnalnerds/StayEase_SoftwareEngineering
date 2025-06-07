import { RequestHandler } from "express";
import { AppError } from "../utils/http/AppError";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcrypt";
import { JWT_SECRET } from "../config/config";
import jwt from "jsonwebtoken";
import z from "zod";


const prisma = new PrismaClient();


const loginUserSchema = z.object({
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z.string(),
});

export const login:RequestHandler = async(req, res, next) => {
  try{
    const reqBody = loginUserSchema.safeParse(req.body);
    if(!reqBody.data){
      res.status(STATUS.BAD_REQUEST).json({
        error: reqBody.error.issues.map((err) => {
          return { message: err.message, path: err.path[0] };
        }),
      });
      return;
    }
    const {email,password} = req.body;
    const userExist = await prisma.user.findUnique({
      where: { email: email }
    });

    if (!userExist) {
      throw new AppError("User not found", STATUS.NOT_FOUND);
    }

    const isPasswordValid = await bcrypt.compare(password, userExist.password);
    if (!isPasswordValid) {
      throw new AppError("Invalid credentials", STATUS.UNAUTHORIZED);
    }

    const tokenPayload = {
      id: userExist.id,
      email: userExist.email,
      username: userExist.username,
      roles: userExist.role,
    };

    const jwtToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "6h" });

    res.status(STATUS.OK).json({
      status: STATUS.OK,
      token: jwtToken,
      user: userExist,
    });
  }catch(e){
    next(e);
  }
};

const createUserSchema = z.object({
  username: z.string(),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  password: z.string(),
  phone: z.string(),
});

export const register:RequestHandler = async(req,res,next) => {
  try{
    const reqBody = createUserSchema.safeParse(req.body);
    if(!reqBody.data){
      res.status(STATUS.BAD_REQUEST).json({
        error: reqBody.error.issues.map((err) => {
          return { message: err.message, path: err.path[0] };
        }),
      });
      return;
    }
    
    const { email, username, password, phone } = reqBody.data;
    
    const userExist = await prisma.user.findUnique({
      where: { email: email }
    });
    console.log(req.body);
    if(userExist){
      throw new AppError("User with this email already exist!", STATUS.FORBIDDEN);
    }
    const hashPass = await bcrypt.hash(password,12);
    const newUser = await prisma.user.create({
      data: {
        "email" : email,
        "password" : hashPass,
        "username" : username,
        "phone" : phone,
        "role": "customer",
      },
    });
    const tokenPayload = {
      id: newUser.id,
      email: newUser.email,
      username: newUser.username,
      roles: newUser.role
    };
    const jwtToken = jwt.sign(tokenPayload, JWT_SECRET, { expiresIn: "6h" })
    res.status(STATUS.OK).json({
      status: STATUS.OK,
      token: jwtToken,
      newUser,
    });
  }catch(e){
    next(e);
  }
}