import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';
import multer from 'multer';
import multerS3 from 'multer-s3';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import cron from "node-cron";

