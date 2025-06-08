import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";
import dotenv from "dotenv";

const prisma = new PrismaClient();

export const getDiscountRate: RequestHandler = async (req, res, next) => {
  try {
    const schema = z.object({
      roomTypeId: z.number(),
      checkInDate: z.string(),
      checkOutDate: z.string(),
      durationDays: z.number(),
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
        minNights: { lte: Number(durationDays) },
      },
      orderBy: { ratePercentage: "desc" },
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
      roomTypeId: z.number(),
      roomNumber: z.number(),
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
      roomTypeId,
      roomNumber,
      adults,
      children,
      specialRequest,
      checkInDate,
      checkOutDate,
      discountRateId,
    } = parsed.data;

    // Fetch the room and its roomType

    // Validate that the room exists and matches the given roomTypeId
    const room = await prisma.room.findUnique({
      where: { roomNumber: String(roomNumber) },
      include: { roomType: true },
    });
    const roomId = room?.id;

    if (!room) {
      res.status(STATUS.BAD_REQUEST).json({ error: "Room not found" });
      return;
    }

    if (room.roomTypeId !== roomTypeId) {
      res
        .status(STATUS.BAD_REQUEST)
        .json({ error: "Room does not match the specified roomTypeId" });
      return;
    }

    const roomType = room.roomType;

    // Check if customer already exists by email
    let customer = await prisma.customer.findUnique({
      where: { email },
    });
    if (!customer) {
      customer = await prisma.customer.create({
        data: {
          id: (await prisma.customer.count()) + 1,
          username: firstName + lastName,
          firstName,
          lastName,
          email,
          phone,
        },
      });
    }

    const checkIn = new Date(checkInDate);
    const checkOut = new Date(checkOutDate);
    const durationMs = checkOut.getTime() - checkIn.getTime();
    const durationDays = Math.ceil(durationMs / (1000 * 60 * 60 * 24));
    const roomTypePrice = roomType.basePrice;

    let discountPercentage = 0;

    if (discountRateId) {
      const discount = await prisma.discountRate.findUnique({
        where: { id: String(discountRateId), isActive: true },
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
      res
        .status(STATUS.BAD_REQUEST)
        .json({ error: "checkOutDate must be after checkInDate" });
      return;
    }

    let totalAmount = durationDays * roomTypePrice;
    if (discountPercentage > 0) {
      totalAmount = totalAmount * (1 - discountPercentage / 100);
    }

    const reservation = await prisma.reservation.create({
      data: {
        customerId: customer.id,
        reservationNumber: `RES-${Date.now()}-${Math.floor(
          Math.random() * 10000
        )}`,
        checkInDate: new Date(checkInDate),
        checkOutDate: new Date(checkOutDate),
        adults,
        children,
        specialRequests: specialRequest,
        totalAmount: totalAmount,
      },
    });

    if (roomNumber && roomId) {
      await prisma.reservationRoom.create({
        data: {
          reservationId: reservation.id,
          roomId: roomId,
          ...(discountRateId ? { discountId: String(discountRateId) } : {}),
        },
      });
    }

    res
      .status(STATUS.CREATED)
      .json({ message: "Reservation created successfully", reservation });
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateReservation: RequestHandler = async (req, res, next) => {
  try {
    // Schema mirip newReservation, semua field optional kecuali id
    const reservationSchema = z.object({
      id: z.number(),
      firstName: z.string().optional(),
      lastName: z.string().optional(),
      email: z.string().email().optional(),
      phone: z.string().optional(),
      roomTypeId: z.number().optional(),
      roomNumber: z.number().optional(),
      adults: z.number().min(1).optional(),
      children: z.number().min(0).optional(),
      specialRequest: z.string().optional(),
      checkInDate: z.string().optional(),
      checkOutDate: z.string().optional(),
      discountRateId: z.number().optional(),
      status: z.string().optional(),
      paymentStatus: z.string().optional(),
    });

    const parsed = reservationSchema.safeParse(req.body);
    if (!parsed.success) {
      res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
      return;
    }

    const {
      id,
      firstName,
      lastName,
      email,
      phone,
      roomTypeId,
      roomNumber,
      adults,
      children,
      specialRequest,
      checkInDate,
      checkOutDate,
      discountRateId,
      status,
      paymentStatus,
    } = parsed.data;

    // Update customer data if provided
    if (firstName || lastName || email || phone) {
      // Cari reservation untuk dapatkan customerId
      const reservation = await prisma.reservation.findUnique({
        where: { id },
        select: { customerId: true },
      });
      if (reservation && reservation.customerId) {
        await prisma.customer.update({
          where: { id: reservation.customerId },
          data: {
            ...(firstName && { firstName }),
            ...(lastName && { lastName }),
            ...(email && { email }),
            ...(phone && { phone }),
          },
        });
      }
    }

    // Update assigned room jika roomNumber/roomTypeId berubah
    if (roomNumber || roomTypeId) {
      // Cari roomId baru
      const room = await prisma.room.findUnique({
        where: { roomNumber: roomNumber ? String(roomNumber) : undefined },
      });
      if (room) {
        // Update assignedRooms
        await prisma.reservationRoom.updateMany({
          where: { reservationId: id },
          data: {
            roomId: room.id,
            ...(discountRateId ? { discountId: String(discountRateId) } : {}),
          },
        });
      }
    }

    // Update reservation utama
    const updatedReservation = await prisma.reservation.update({
      where: { id },
      data: {
        ...(checkInDate && { checkInDate: new Date(checkInDate) }),
        ...(checkOutDate && { checkOutDate: new Date(checkOutDate) }),
        ...(adults && { adults }),
        ...(children && { children }),
        ...(status && { status }),
        ...(paymentStatus && { paymentStatus }),
        ...(specialRequest && { specialRequests: specialRequest }),
      },
      include: {
        customer: true,
        assignedRooms: {
          include: {
            room: {
              include: {
                roomType: true,
              },
            },
          },
        },
      },
    });

    res
      .status(STATUS.OK)
      .json({
        message: "Reservation updated successfully",
        reservation: updatedReservation,
      });
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
        paymentStatus: true,
        checkInStatus: true,
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
          },
        },
        assignedRooms: {
          select: {
            room: {
              select: {
                roomNumber: true,
                roomType: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(STATUS.OK).json({ reservations });
  } catch (e) {
    next(e);
  }
};

export const getConfirmedReservationsData: RequestHandler = async (
  req,
  res,
  next
) => {
  try {
    const reservations = await prisma.reservation.findMany({
      where: {
        status: "confirmed",
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
          },
        },
        assignedRooms: {
          select: {
            room: {
              select: {
                roomNumber: true,
                roomType: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    res.status(STATUS.OK).json({ reservations });
  } catch (e) {
    next(e);
  }
};

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

    const { reservationId, paymentStatus, paymentMethod, staffId } =
      parsed.data;

    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: { paymentStatus },
    });

    if (paymentStatus === "paid") {
      await prisma.payment.create({
        data: {
          paymentNumber: `PAY-${Date.now()}-${Math.floor(
            Math.random() * 10000
          )}`,
          reservationId: updatedReservation.id,
          amount: updatedReservation.totalAmount,
          paymentMethod: paymentMethod,
          paymentStatus: paymentStatus,
          transactionId: `TXN${Math.floor(100000 + Math.random() * 900000)}`,
          paymentDate: new Date(),
          paymentType: "Room Charge",
          processedById: String(staffId),
        },
      });
    }
    res.status(STATUS.OK).json({
      message: "Payment status updated",
      reservation: updatedReservation,
    });
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
      data: { checkInStatus },
    });

    res.status(STATUS.OK).json({
      message: "Check-in status updated",
      reservation: updatedReservation,
    });
  } catch (error) {
    next(error);
  }
};

export const searchReservationsByGuestName: RequestHandler = async (
  req,
  res,
  next
) => {
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
            { lastName: { startsWith: searchTerm, mode: "insensitive" } },
          ],
        },
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
          },
        },
      },
    });

    res.status(STATUS.OK).json({ reservations });
  } catch (error) {
    next(error);
  }
};

export const searchConfirmedReservationsByGuestName: RequestHandler = async (
  req,
  res,
  next
) => {
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
            { lastName: { startsWith: searchTerm, mode: "insensitive" } },
          ],
        },
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
          },
        },
        assignedRooms: {
          select: {
            room: {
              select: {
                roomNumber: true,
                roomType: {
                  select: {
                    name: true,
                  },
                },
              },
            },
          },
        },
      },
    });

    res.status(STATUS.OK).json({ reservations });
  } catch (error) {
    next(error);
  }
};

export const deleteReservation: RequestHandler = async (req, res, next) => {
  try {
    // Remove zod validation, just parse reservationId as number
    const reservationId = Number(req.params.id);
    if (isNaN(reservationId)) {
      res.status(STATUS.BAD_REQUEST).json({ error: "Invalid reservationId" });
      return;
    }

    // Delete related assigned rooms first (if any)
    await prisma.reservationRoom.deleteMany({
      where: { reservationId },
    });

    // Delete payments related to this reservation (if any)
    await prisma.payment.deleteMany({
      where: { reservationId },
    });

    // Delete the reservation itself
    await prisma.reservation.delete({
      where: { id: reservationId },
    });

    res.status(STATUS.OK).json({ message: "Reservation deleted successfully" });
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
          },
        },
      },
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
      },
    });

    // Check-in today
    const checkInToday = await prisma.reservation.count({
      where: {
        checkInDate: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Check-out today
    const checkOutToday = await prisma.reservation.count({
      where: {
        checkOutDate: {
          gte: today,
          lt: tomorrow,
        },
      },
    });

    // Total reservations
    const totalReservations = await prisma.reservation.count();

    res.status(STATUS.OK).json({
      totalGuests:
        (guestStats._sum.adults ?? 0) + (guestStats._sum.children ?? 0),
      checkInToday,
      checkOutToday,
      totalReservations,
    });
  } catch (error) {
    next(error);
  }
};

export const confirmReservation: RequestHandler = async (req, res, next) => {
  try {
    const reservationId = Number(req.params.id);

    if (isNaN(reservationId) || reservationId <= 0) {
      res.status(STATUS.BAD_REQUEST).json({ error: "Invalid reservationId" });
      return;
    }

    const updatedReservation = await prisma.reservation.update({
      where: { id: reservationId },
      data: { status: "confirmed" },
    });

    res.status(STATUS.OK).json({
      message: "Reservation confirmed successfully",
      reservation: updatedReservation,
    });
  } catch (error) {
    next(error);
  }
};
