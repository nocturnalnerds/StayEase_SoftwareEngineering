import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const contactUsSchema = z.object({
  name: z.string(),
  email: z.string().regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email format"),
  phone: z.string(),
  subject: z.string(),
  message: z.string().nullable()
});

export const createContactUs: RequestHandler = async(req,res,next) => {
  try{
    const reqBody = contactUsSchema.safeParse(req.body);
    if(!reqBody.data){
      res.status(STATUS.BAD_REQUEST).json({
        error: reqBody.error.issues.map((err) => {
          return { message: err.message, path: err.path[0] };
        }),
      });
      return;
    }
    const { name, email, phone, subject, message } = req.body;
    const newContactUs = await prisma.contactUsInfo.create({
      data: {
        name: name,
        email: email,
        phone: phone,
        subject: subject,
        message: message
      }
    });
    res.status(STATUS.OK).json({
      status: STATUS.OK,
      message: "Successfully Send Contact Info",
      debug: newContactUs
    });
  }catch(e){
    next(e);
  }
}

