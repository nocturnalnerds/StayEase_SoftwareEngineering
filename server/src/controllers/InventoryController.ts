import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllInventory: RequestHandler = async (req, res) => {
    try {
        const inventory = await prisma.inventoryItem.findMany(
            {
                select: {
                    id: true,
                    name: true,
                    quantity: true,
                    maxStock: true,
                    unit: true,
                    reorderLevel: true,
                    cost: true,
                    supplier: true,
                    lastRestocked: true,
                    location: true,
                }
            }
        );
        res.status(STATUS.OK).json(inventory);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch inventory" });
    }
};



