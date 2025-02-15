import { PrismaClient } from "@prisma/client";

/**
 * Prisma client instance
 */
export const prisma = new PrismaClient();
export const JWT_SECRET = process.env.JWT_SECRET as string;