import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllFoodOrders: RequestHandler = async (req, res) => {
    try {
        const foodOrders = await prisma.foodOrder.findMany();
        res.status(STATUS.OK).json(foodOrders);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch food orders" });
    }
};

export const getFoodOrderById: RequestHandler = async (req, res) => {
    const id = req.body;
    if (isNaN(id)) {
        res.status(STATUS.BAD_REQUEST).json({ error: "Invalid food order ID" });
        return;
    }
    try {
        const foodOrder = await prisma.foodOrder.findFirst({
            where: { id: String(id) },
            include: { items: true }
        });
        if (!foodOrder) {
            res.status(STATUS.NOT_FOUND).json({ error: "Food order not found" });
            return
        }
        res.status(STATUS.OK).json(foodOrder);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch food order" });
    }
};

export const getAllFoodItems: RequestHandler = async (req, res) => {
    try {
        const foodItems = await prisma.foodItem.findMany();
        res.status(STATUS.OK).json(foodItems);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch food items" });
    }
};

export const addFoodOrder: RequestHandler = async (req, res) => {
    const schema = z.object({
        customerName: z.string(),
        items: z.array(
            z.object({
                id: z.number().int().positive(),
                quantity: z.number().int().positive().min(1)
            })
        ),
    });
    try {
        const parseResult = schema.safeParse(req.body);
        if (!parseResult.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parseResult.error.errors });
            return;
        }

        const { customerName, items } = parseResult.data;

        let totalAmount = 0;
        for (const item of items) {
            const foodItem = await prisma.foodItem.findFirstOrThrow({ where: { id: item.id } });
            if (!foodItem) {
                res.status(STATUS.BAD_REQUEST).json({ error: `Food item with id ${item.id} not found` });
                return;
            }
            // Default quantity to 1 if not provided
            const quantity = item.quantity ?? 1;
            totalAmount += foodItem.price * item.quantity;
        }
        const newOrder = await prisma.foodOrder.create({
            data: {
                customerName,
                totalAmount,
                orderNumber: `ORD-${Date.now()}`,
                orderDate: new Date(),
                status: "pending",
                items: {
                    create: items.map(item => ({
                        quantity: item.quantity,
                        foodItem: {
                            connect: { id: item.id }
                        }
                    }))
                }
            },
            include: { items: true }
        });
        res.status(STATUS.CREATED).json(newOrder);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to create food order" });
    }
};


export const updateFoodOrderStatus: RequestHandler = async (req, res) => {
    const schema = z.object({
        id: z.string(),
        status: z.enum(["pending", "preparing", "ready", "served", "cancelled"])
    });

    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({ error: parseResult.error.errors });
        return;
    }

    const { id, status } = parseResult.data;

    try {
        const updatedOrder = await prisma.foodOrder.update({
            where: { id },
            data: { status }
        });
        res.status(STATUS.OK).json(updatedOrder);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to update food order status" });
    }
};


export const getDashboardStats: RequestHandler = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        const [pendingOrders, preparingOrders, currentlyDiningOrders, todayRevenue] = await Promise.all([
            prisma.foodOrder.count({ where: { status: "Pending" } }),
            prisma.foodOrder.count({ where: { status: "Preparing" } }),
            prisma.foodOrder.count({
                where: {
                    orderDate: {
                        gte: today,
                        lt: tomorrow
                    }
                }
            }),
            prisma.foodOrder.aggregate({
                _sum: { totalAmount: true },
                where: {
                    orderDate: {
                        gte: today,
                        lt: tomorrow
                    }
                }
            })
        ]);

        res.status(STATUS.OK).json({
            pendingOrders,
            preparingOrders,
            currentlyDiningOrders,
            todayRevenue: todayRevenue._sum.totalAmount || 0
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch dashboard stats" });
    }
};