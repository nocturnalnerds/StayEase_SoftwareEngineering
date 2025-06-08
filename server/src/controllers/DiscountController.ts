import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getAllDiscount: RequestHandler = async (req, res, next) => {
    try {
        const discountRates = await prisma.discountRate.findMany({
            include: {
                roomType: true,
            },
        });
        res.status(STATUS.OK).json({ data: discountRates });
    } catch (error) {
        next(error);
    }
}


export const updateDiscountRate: RequestHandler = async (req, res, next) => {
    const schema = z.object({
        id: z.number(),
        rate: z.number().min(0).max(100),
        description: z.string().optional(),
    });

    try {
        const { id, rate, description } = schema.parse(req.body);

        const updatedDiscount = await prisma.discountRate.update({
            where: { id: String(id) },
            data: { ratePercentage: rate, description },
        });

        res.status(STATUS.OK).json({ data: updatedDiscount });
    } catch (error) {
        next(error);
    }
};

const schema = z.object({
        name: z.string().min(0).max(100),
        rate: z.number().min(0).max(100),
        description: z.string().optional(),
        endDate: z.string().datetime(),
        minNights: z.number().min(1),
        roomTypeId: z.number(),
        isActive: z.boolean().default(true),
    });

export const createDiscountRate: RequestHandler = async (req, res, next) => {
    try {
        const { name, rate, description, endDate, minNights, roomTypeId, isActive } = schema.parse(req.body);

        const newDiscount = await prisma.discountRate.create({
            data: {
                name,
                ratePercentage: rate,
                startDate: new Date(),
                endDate: new Date(endDate),
                minNights,
                roomTypeId,
                isActive,
                description,
            },
        });

        res.status(STATUS.CREATED).json({ data: newDiscount });
    } catch (error) {
        next(error);
    }
};

export const editDiscountRate: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            id: z.number(),
            name: z.string().min(0).max(100).optional(),
            rate: z.number().min(0).max(100).optional(),
            description: z.string().optional(),
            endDate: z.string().datetime().optional(),
            minNights: z.number().min(1).optional(),
            roomTypeId: z.number().optional(),
            isActive: z.boolean().optional(),
        });

        const { id, ...updateData } = schema.parse(req.body);

        const data: any = {};
        if (updateData.name !== undefined) data.name = updateData.name;
        if (updateData.rate !== undefined) data.ratePercentage = updateData.rate;
        if (updateData.description !== undefined) data.description = updateData.description;
        if (updateData.endDate !== undefined) data.endDate = new Date(updateData.endDate);
        if (updateData.minNights !== undefined) data.minNights = updateData.minNights;
        if (updateData.roomTypeId !== undefined) data.roomTypeId = updateData.roomTypeId;
        if (updateData.isActive !== undefined) data.isActive = updateData.isActive;

        const updatedDiscount = await prisma.discountRate.update({
            where: { id: String(id) },
            data,
        });

        res.status(STATUS.OK).json({ data: updatedDiscount });
    } catch (error) {
        next(error);
    }
};


export const deleteDiscountRate: RequestHandler = async (req, res, next) => {
    const schema = z.object({
        id: z.number(),
    });

    try {
        const { id } = schema.parse(req.body);

        await prisma.discountRate.delete({
            where: { id: String(id) },
        });

        res.status(STATUS.OK).json({ message: "Discount rate deleted successfully." });
    } catch (error) {
        next(error);
    }
};

export const searchDiscountByName: RequestHandler = async (req, res, next) => {
    const schema = z.object({
        name: z.string().min(1),
    });

    try {
        const { name } = schema.parse(req.query);

        const discounts = await prisma.discountRate.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive",
                },
            },
            include: {
                roomType: true,
            },
        });

        res.status(STATUS.OK).json({ data: discounts });
    } catch (error) {
        next(error);
    }
};