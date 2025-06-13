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

const inventoryItemSchema = z.object({
    name: z.string().min(1),
    SKU: z.string(),
    price: z.number(),
    category: z.string(),
    quantity: z.number().int().nonnegative(),
    maxStock: z.number().int().nonnegative(),
    unit: z.string().min(1),
    reorderLevel: z.number().int().nonnegative(),
    supplier: z.string().min(1),
    location: z.string().min(1),
});

export const addInventoryItem: RequestHandler = async (req, res) => {
    const parseResult = inventoryItemSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({ error: parseResult.error.errors });
        return;
    }

    try {
        const validatedData = parseResult.data;
        const newItem = await prisma.inventoryItem.create({
            data: {
                name: validatedData.name,
                SKU: validatedData.SKU,
                category: validatedData.category,
                quantity: validatedData.quantity,
                maxStock: validatedData.maxStock,
                unit: validatedData.unit,
                reorderLevel: validatedData.reorderLevel,
                cost: validatedData.price, 
                supplier: validatedData.supplier,
                lastRestocked: new Date(), 
                location: validatedData.location,
            },
        });
        res.status(STATUS.CREATED).json(newItem);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to add inventory item" });
    }
};

export const toggleLastRestocked: RequestHandler = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        res.status(STATUS.BAD_REQUEST).json({ error: "Missing inventory item ID" });
        return;
    }

    try {
        const item = await prisma.inventoryItem.findUnique({ where: { id: Number(id) } });
        if (!item) {
            res.status(STATUS.NOT_FOUND).json({ error: "Inventory item not found" });
            return;
        }

        const updatedItem = await prisma.inventoryItem.update({
            where: { id: Number(id) },
            data: { 
                lastRestocked: new Date(), 
                quantity: Number(item.maxStock),
            },
        });

        res.status(STATUS.OK).json(updatedItem);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to update lastRestocked" });
    }
};


const inventoryTransactionSchema = z.object({
    orderNumber: z.string().min(1),
    supplier: z.string().min(1),
    items: z.number().int().positive(),
    totalAmount: z.number().nonnegative(),
    orderDate: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid order date" }),
    expectedDelivery: z.string().refine((val) => !isNaN(Date.parse(val)), { message: "Invalid expected delivery date" }),
    status: z.string().min(1),
});

export const getAllInventoryTransactions: RequestHandler = async (req, res) => {
    try {
        const transactions = await prisma.inventoryTransaction.findMany({
            include: {
                item: true,
                Staff: true,
            },
        });
        res.status(STATUS.OK).json(transactions);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch inventory transactions" });
    }
};

export const createInventoryTransaction: RequestHandler = async (req, res) => {
    const parseResult = inventoryTransactionSchema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({ error: parseResult.error.errors });
        return;
    }

    try {
        const { orderNumber, supplier, items, totalAmount, orderDate, expectedDelivery, status } = parseResult.data;
        const newTransaction = await prisma.inventoryTransaction.create({
            data: {
                orderNumber,
                supplier,
                items,
                totalAmount,
                orderDate: new Date(orderDate),
                expectedDelivery: new Date(expectedDelivery),
                status,
            },
            include: {
                item: true,
                Staff: true,
            },
        });
        if (req.body.itemId && typeof req.body.itemId === "number") {
            await prisma.inventoryItem.update({
                where: { id: req.body.itemId },
                data: {
                    quantity: {
                        increment: req.body.items
                    },
                    lastRestocked: new Date()
                }
            });
        }
        res.status(STATUS.CREATED).json(newTransaction);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to create inventory transaction" });
    }
};

