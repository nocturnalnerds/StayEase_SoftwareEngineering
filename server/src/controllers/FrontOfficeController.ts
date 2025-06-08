import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

const prisma = new PrismaClient();


export const getDiscountRate: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            roomTypeId: z.number(),
            checkInDate: z.string(),
            checkOutDate: z.string(),
            durationDays: z.number()
        });

        const parsed = schema.safeParse(req.query);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const { roomTypeId, checkInDate, checkOutDate, durationDays } = parsed.data;

        const discountRate = await prisma.discountRate.findFirst({
            where: {
                roomTypeId: Number(roomTypeId),
                isActive: true,
                startDate: { lte: new Date(checkInDate) },
                endDate: { gte: new Date(checkOutDate) },
                minNights: { lte: Number(durationDays) }
            },
            orderBy: { ratePercentage: 'desc' }
        });

        if (!discountRate) {
            res.status(STATUS.NOT_FOUND).json({ error: "No discount rate found" });
            return;
        }

        res.status(STATUS.OK).json({ discountRate });
    } catch (error) {
        next(error);
    }
};

export const newReservation: RequestHandler = async (req, res, next) => {
    try {
        // Define schema for request body validation
        const reservationSchema = z.object({
            firstName: z.string().min(1, { message: "firstName is required" }),
            lastName: z.string().min(1, { message: "lastName is required" }),
            email: z.string().email(),
            phone: z.string().min(1, { message: "phone is required" }),
            roomId: z.number(),
            adults: z.number().min(1, { message: "adults must be at least 1" }),
            children: z.number().min(0, { message: "children cannot be negative" }),
            specialRequest: z.string().optional(),
            checkInDate: z.string().min(1, { message: "checkInDate is required" }),
            checkOutDate: z.string().min(1, { message: "checkOutDate is required" }),
            discountRateId: z.number().optional(),
        });

        // Validate request body
        const parsed = reservationSchema.safeParse(req.body);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const {
            firstName,
            lastName,
            email,
            phone,
            roomId,
            adults,
            children,
            specialRequest,
            checkInDate,
            checkOutDate,
            discountRateId,
        } = parsed.data;

        const customer = await prisma.customer.create({
            data: {
                id: (await prisma.customer.count()) + 1,
                username: firstName + lastName,
                firstName,
                lastName,
                email,
                phone,
            }
        });

        const room = await prisma.room.findUnique({
            where: { id: roomId },
            include: { roomType: true }
        });

        const roomTypeId = room?.roomTypeId;
        if (!roomTypeId) {
            res.status(STATUS.BAD_REQUEST).json({ error: "Room type not found for the given roomId" });
            return;
        }

        const roomType = await prisma.roomType.findUnique({
            where: { id: roomTypeId }
        });

        if (!roomType) {
            res.status(STATUS.BAD_REQUEST).json({ error: "Invalid roomTypeId" });
            return;
        }
        
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(checkOutDate);
        const durationMs = checkOut.getTime() - checkIn.getTime();
        const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
        const roomTypePrice = roomType.basePrice;
        
        let discountPercentage = 0;

        if (discountRateId) {
            const discount = await prisma.discountRate.findUnique({
                where: { id: String(discountRateId), isActive: true }
            });
            if (discount) {
                discountPercentage = discount.ratePercentage;
            }
        }

        if (!room || !room.roomType) {
            res.status(STATUS.BAD_REQUEST).json({ error: "Invalid roomId" });
            return;
        }


        if (durationDays <= 0) {
            res.status(STATUS.BAD_REQUEST).json({ error: "checkOutDate must be after checkInDate" });
            return;
        }

        let totalAmount = durationDays * roomTypePrice;
        if (discountPercentage > 0) {
            totalAmount = totalAmount * (1 - discountPercentage / 100);
        }

        const reservation = await prisma.reservation.create({
            data: {
                customerId: customer.id,
                reservationNumber: `RES-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                checkInDate,
                checkOutDate,
                adults,
                children,
                specialRequests: specialRequest,
                totalAmount,
            }
        });

        await prisma.reservationRoom.create({
            data: {
                reservationId: reservation.id,
                roomId: roomId,
                discountId: String(discountRateId)
            }
        });
        res.status(STATUS.CREATED).json({ message: "Reservation created successfully", reservation });
    } catch (error) {
        next(error);
    }
};


export const getReservationsData: RequestHandler = async (req, res, next) => {
    try {
        const reservations = await prisma.reservation.findMany({
            select: {
                id: true,
                customerId: true,
                checkInDate: true,
                checkOutDate: true,
                adults: true,
                children: true,
                status: true,
                specialRequests: true,
                totalAmount: true,
                customer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    }
                }
                ,
                assignedRooms: {
                    select: {
                        room: {
                            select: {
                                roomNumber: true,
                                roomType: {
                                    select: {
                                        name: true
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        res.status(STATUS.OK).json({ reservations });
    }catch(e){
        next(e);
    }
};


export const getConfirmedReservationsData: RequestHandler = async(req, res, next) => {
    try{
        const reservations = await prisma.reservation.findMany({
            where:{
                status: "confirmed"
            },
            select: {
                id: true,
                customerId: true,
                checkInDate: true,
                checkOutDate: true,
                adults: true,
                children: true,
                checkInStatus: true,
                paymentStatus: true,
                specialRequests: true,
                totalAmount: true,
                customer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    }
                },
                assignedRooms: {
                    select: {
                        room: {
                            select: {
                            roomNumber: true,
                            roomType: {
                                select: {
                                name: true,
                                }
                            }
                            }
                        }
                    }
                }
            }
        });
        res.status(STATUS.OK).json({ reservations });
    }catch(e){
        next(e);
    }
}


export const updatePaymentStatus: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            reservationId: z.number(),
            paymentStatus: z.enum(["pending", "paid", "failed"]),
            paymentMethod: z.enum(["Credit Card", "Cash"]),
            staffId: z.number(),
        });

        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const { reservationId, paymentStatus, paymentMethod , staffId} = parsed.data;

        const updatedReservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: { paymentStatus }
        });

        if (paymentStatus === "paid") {
            await prisma.payment.create({
                data: {
                    paymentNumber: `PAY-${Date.now()}-${Math.floor(Math.random() * 10000)}`,
                    reservationId: updatedReservation.id,
                    amount: updatedReservation.totalAmount,
                    paymentMethod: paymentMethod,
                    paymentStatus: paymentStatus,
                    transactionId: `TXN${Math.floor(100000 + Math.random() * 900000)}`,
                    paymentDate: new Date(),
                    paymentType: "Room Charge",
                    processedById: String(staffId),
                }
            });   
        }
        res.status(STATUS.OK).json({ message: "Payment status updated", reservation: updatedReservation });
    } catch (error) {
        next(error);
    }
};


export const updateCheckInStatus: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            reservationId: z.number(),
            checkInStatus: z.enum(["pending", "checked_in", "checked_out"]),
        });

        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const { reservationId, checkInStatus } = parsed.data;

        const updatedReservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: { checkInStatus }
        });

        res.status(STATUS.OK).json({ message: "Check-in status updated", reservation: updatedReservation });
    } catch (error) {
        next(error);
    }
};

export const searchReservationsByGuestName: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            guestName: z.string().min(1, { message: "guestName is required" }),
        });

        const parsed = schema.safeParse(req.query);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const { guestName } = parsed.data;
        const searchTerm = guestName.trim();

        const reservations = await prisma.reservation.findMany({
            where: {
                customer: {
                    OR: [
                        { firstName: { startsWith: searchTerm, mode: "insensitive" } },
                        { lastName: { startsWith: searchTerm, mode: "insensitive" } }
                    ]
                }
            },
            select: {
                id: true,
                customerId: true,
                checkInDate: true,
                checkOutDate: true,
                adults: true,
                children: true,
                status: true,
                specialRequests: true,
                totalAmount: true,
                customer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    }
                }
            }
        });

        res.status(STATUS.OK).json({ reservations });
    } catch (error) {
        next(error);
    }
};


export const searchConfirmedReservationsByGuestName: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            guestName: z.string().min(1, { message: "guestName is required" }),
        });

        const parsed = schema.safeParse(req.query);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const { guestName } = parsed.data;
        const searchTerm = guestName.trim();

        const reservations = await prisma.reservation.findMany({
            where: {
                status: "confirmed",
                customer: {
                    OR: [
                        { firstName: { startsWith: searchTerm, mode: "insensitive" } },
                        { lastName: { startsWith: searchTerm, mode: "insensitive" } }
                    ]
                }
            },
            select: {
                id: true,
                customerId: true,
                checkInDate: true,
                checkOutDate: true,
                adults: true,
                children: true,
                checkInStatus: true,
                paymentStatus: true,
                specialRequests: true,
                totalAmount: true,
                customer: {
                    select: {
                        firstName: true,
                        lastName: true,
                        email: true,
                        phone: true,
                    }
                },
                assignedRooms: {
                    select: {
                        room: {
                            select: {
                                roomNumber: true,
                                roomType: {
                                    select: {
                                        name: true,
                                    }
                                }
                            }
                        }
                    }
                }
            }
        });

        res.status(STATUS.OK).json({ reservations });
    } catch (error) {
        next(error);
    }
};

export const updateReservation: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            reservationId: z.number(),
            checkInDate: z.string().optional(),
            checkOutDate: z.string().optional(),
            adults: z.number().min(1).optional(),
            children: z.number().min(0).optional(),
            specialRequests: z.string().optional(),
            status: z.string().optional(),
        });

        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const { reservationId, ...updateData } = parsed.data;

        const reservation = await prisma.reservation.update({
            where: { id: reservationId },
            data: updateData
        });

        res.status(STATUS.OK).json({ message: "Reservation updated successfully", reservation });
    } catch (error) {
        next(error);
    }
};

export const getRoomList: RequestHandler = async (req, res, next) => {
    try {
        const rooms = await prisma.room.findMany({
            where: {
                status: "Available",
            },
            select: {
                id: true,
                roomNumber: true,
                floor: true,
                status: true,
                roomType: {
                    select: {
                        id: true,
                        name: true,
                        basePrice: true,
                    }
                }
            }
        });
        res.status(STATUS.OK).json({ rooms });
    } catch (error) {
        next(error);
    }
};


export const getDashboardStats: RequestHandler = async (req, res, next) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // Total guests (adults + children)
        const guestStats = await prisma.reservation.aggregate({
            _sum: {
                adults: true,
                children: true,
            }
        });

        // Check-in today
        const checkInToday = await prisma.reservation.count({
            where: {
                checkInDate: {
                    gte: today,
                    lt: tomorrow,
                }
            }
        });

        // Check-out today
        const checkOutToday = await prisma.reservation.count({
            where: {
                checkOutDate: {
                    gte: today,
                    lt: tomorrow,
                }
            }
        });

        // Total reservations
        const totalReservations = await prisma.reservation.count();

        res.status(STATUS.OK).json({
            totalGuests: (guestStats._sum.adults ?? 0) + (guestStats._sum.children ?? 0),
            checkInToday,
            checkOutToday,
            totalReservations
        });
    } catch (error) {
        next(error);
    }
};