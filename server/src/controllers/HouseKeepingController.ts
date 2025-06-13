import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const getPendingHouseKeeperRooms: RequestHandler = async (req, res) => {
    try {
        const pendingRooms = await prisma.houseKeeperRoom.findMany({
            where: { status: "pending" },
        });
        res.status(STATUS.OK).json(pendingRooms);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch pending rooms." });
    }
};

export const getCompletedHouseKeeperRooms: RequestHandler = async (req, res) => {
    try {
        const pendingRooms = await prisma.houseKeeperRoom.findMany({
            where: { status: { in: ["completed", "resolved"] } },
        });
        res.status(STATUS.OK).json(pendingRooms);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch pending rooms." });
    }
};

export const getMaintananceHouseKeeperRooms: RequestHandler = async (req, res) => {
    try {
        const pendingRooms = await prisma.houseKeeperRoom.findMany({
            where: { status: "maintanance" },
        });
        res.status(STATUS.OK).json(pendingRooms);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch pending rooms." });
    }
};


export const getAllRoomNumbers: RequestHandler = async (req, res) => {
    try {
        const rooms = await prisma.room.findMany({
            select: { roomNumber: true },
        });
        const roomNumbers = rooms.map(room => room.roomNumber);
        res.status(STATUS.OK).json({ roomNumbers });
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch room numbers." });
    }
};


export const getAllHouseKeepingStaff: RequestHandler = async (req, res) => {
    try {
        const staff = await prisma.staff.findMany({
            where: { role: "Housekeeping" },
        });
        res.status(STATUS.OK).json(staff);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch housekeeping staff." });
    }
};

export const addHouseKeepingTask: RequestHandler = async (req, res) => {
    const schema = z.object({
        roomId: z.number(),
        taskType: z.string(),
        priority: z.string(),
        staffId: z.string(),
        notes: z.string().nullable(),
    });

    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({ error: "Invalid input", details: parseResult.error.errors });
        return;
    }

    const { roomId, taskType, priority, staffId, } = parseResult.data;

    try {
        const staff = await prisma.staff.findFirst({
            where: { id: staffId, role: "Housekeeping" , status: "Active"},
        });

        if (!staff) {
            res.status(STATUS.NOT_FOUND).json({ error: "Staff not found" });
            return;
        }


        const newTask = await prisma.houseKeeperRoom.create({
            data: {
                roomId,
                taskType,
                priority,
                assignedTo: staff.firstName + " "  + staff.lastName,
                lastCleaned: new Date(),
            },
        });

        await prisma.staff.update({
            where: { id: staffId },
            data: { status: "On Duty" },
        });

        res.status(STATUS.CREATED).json(newTask);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to add housekeeping task." });
    }
};



export const updateHouseKeepingTaskStatus: RequestHandler = async (req, res) => {
    const schema = z.object({
        taskId: z.string(),
        status: z.enum(["pending", "completed", "maintanance", "resolved"]),
    });

    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({ error: "Invalid input", details: parseResult.error.errors });
        return;
    }

    const { taskId, status } = parseResult.data;

    try {
        const updatedTask = await prisma.houseKeeperRoom.update({
            where: { id: taskId },
            data: { status },
        });
        if (status === "completed" || status === "resolved") {
            await prisma.staff.updateMany({
                where: { firstName: updatedTask.assignedTo.split(" ")[0] },
                data: { status: "Available" },
            });
        }

        res.status(STATUS.OK).json(updatedTask);
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to update task status." });
    }
};

export const deleteHouseKeepingTask: RequestHandler = async (req, res) => {
    const schema = z.object({
        taskId: z.string(),
    });

    const parseResult = schema.safeParse(req.body);
    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({ error: "Invalid input", details: parseResult.error.errors });
        return;
    }

    const { taskId } = parseResult.data;

    try {
        const deletedTask = await prisma.houseKeeperRoom.delete({
            where: { id: taskId },
        });
        res.status(STATUS.OK).json({ message: "Task deleted successfully", deletedTask });
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to delete housekeeping task." });
    }
};

export const getHouseKeepingDashboardStats: RequestHandler = async (req, res) => {
    try {
        const [pendingCount, completedCount, maintananceCount, totalRooms] = await Promise.all([
            prisma.houseKeeperRoom.count({ where: { status: "pending" } }),
            prisma.houseKeeperRoom.count({ where: { status: { in: ["completed", "resolved"] } } }),
            prisma.houseKeeperRoom.count({ where: { status: "maintanance" } }),
            prisma.room.count(),
        ]);

        res.status(STATUS.OK).json({
            pendingTasks: pendingCount,
            completedTasks: completedCount,
            maintananceTasks: maintananceCount,
            totalRooms,
        });
    } catch (error) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({ error: "Failed to fetch dashboard stats." });
    }
};