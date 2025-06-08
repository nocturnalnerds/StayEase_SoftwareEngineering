import { RequestHandler } from "express";
import z from "zod";
import { STATUS } from "../utils/http/statusCodes";
import { PrismaClient } from "@prisma/client";
import dotenv from 'dotenv';

const prisma = new PrismaClient();

export const getAllUsers: RequestHandler = async (req, res, next) => {
    try{
        const users = await prisma.user.findMany();
        res.status(STATUS.OK).json(users);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch users",
            details: e instanceof Error ? e.message : String(e)
        });
    }
}


export const createUser: RequestHandler = async (req, res, next) => {
    const userSchema = z.object({
        name: z.string().min(1, "Name is required"),
        email: z.string().email("Invalid email address"),
        password: z.string().min(6, "Password must be at least 6 characters"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        role: z.enum(["Administrator", "Manager", "Staff", "Customer"]),
        
    });

    const parseResult = userSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({
            error: "Invalid user data",
            details: parseResult.error.errors,
        });
        return;
    }

    const { name, email, password, phone, role } = parseResult.data;

    try {
        const existingUser = await prisma.user.findUnique({ where: { email } });
        if (existingUser) {
            res.status(STATUS.BAD_REQUEST).json({
                error: "User with this email already exists",
            });
            return;
        }

        const userCount = await prisma.user.count();
        const newUser = await prisma.user.create({
            data: { id: (userCount + 1).toString(), username: name, email, password, phone, role },
        });

        res.status(STATUS.CREATED).json(newUser);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to create user",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};

export const createStaff: RequestHandler = async (req, res, next) => {
    const staffSchema = z.object({
        name: z.string().min(1, "Name is required"),
        role: z.string().min(1, "Role is required"),
        email: z.string().email("Invalid email address"),
        firstName: z.string().min(1, "First name is required"),
        lastName: z.string().min(1, "Last name is required"),
        phone: z.string().min(10, "Phone number must be at least 10 digits"),
        department: z.string().min(1, "Department is required"),
        salary: z.number().min(0, "Salary must be a positive number"),
        division: z.string().min(1, "Division is required"),
        hireDate: z.string().min(1, "Hire date is required"),
        status: z.string().min(1, "Status is required"),
    });

    const parseResult = staffSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({
            error: "Invalid staff data",
            details: parseResult.error.errors,
        });
        return;
    }

    const { name, role,email, firstName,division, lastName ,phone, department, salary, hireDate, status } = parseResult.data;

    try {
        const staffCount = await prisma.staff.count();
        const newStaff = await prisma.staff.create({
            data: {
                id: (staffCount + 1).toString(),
                username: name,
                email,
                firstName,
                lastName,
                phone,
                role,
                department,
                salary,
                hireDate: new Date(hireDate),
                status,
                division,
                lastLogin: new Date(hireDate),
            },
        });

        res.status(STATUS.CREATED).json(newStaff);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to create staff",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};



export const getAllStaff: RequestHandler = async (req, res, next) => {
    try {
        const staff = await prisma.staff.findMany();
        const formattedStaff = staff.map(member => ({
            username: member.username,
            firstName: member.firstName,
            lastName : member.lastName,
            phone: member.phone,
            role: member.role,
            department: member.department,
            division: member.division,
            salary: member.salary,
            hireDate: member.hireDate,
            status: member.status,
            lastLogin: member.lastLogin,
            profileImage: member.profileImage,
        }));
        res.status(STATUS.OK).json(formattedStaff);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch staff",
            details: e instanceof Error ? e.message : String(e)
        });
    }
};

export const getUserById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const user = await prisma.user.findUnique({
            where: { id: String(id) },
        });
        if (!user) {
            res.status(STATUS.NOT_FOUND).json({ error: "User not found" });
            return;
        }
        res.status(STATUS.OK).json(user);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch user",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};

export const getStaffById: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    try {
        const staff = await prisma.staff.findUnique({
            where: { id: String(id) },
        });
        if (!staff) {
            res.status(STATUS.NOT_FOUND).json({ error: "Staff not found" });
            return;
        }
        const formattedStaff = {
            name: staff.username,
            position: staff.role + staff.department,
            salary: staff.salary,
            HireDate: staff.hireDate,
            Status: staff.status,
        };
        res.status(STATUS.OK).json(formattedStaff);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch staff",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};


export const updateUser: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const userSchema = z.object({
        name: z.string().min(1, "Name is required").optional(),
        email: z.string().email("Invalid email address").optional(),
        password: z.string().min(6, "Password must be at least 6 characters").optional(),
        phone: z.string().min(10, "Phone number must be at least 10 digits").optional(),
        role: z.enum(["Administrator", "Manager", "Staff", "Customer"]).optional(),
    });

    const parseResult = userSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({
            error: "Invalid user data",
            details: parseResult.error.errors,
        });
        return;
    }

    const { name, email, password, phone, role } = parseResult.data;

    try {
        const user = await prisma.user.findUnique({ where: { id: String(id) } });
        if (!user) {
            res.status(STATUS.NOT_FOUND).json({ error: "User not found" });
            return;
        }

        const updatedUser = await prisma.user.update({
            where: { id: String(id) },
            data: {
                ...(name && { username: name }),
                ...(email && { email }),
                ...(password && { password }),
                ...(phone && { phone }),
                ...(role && { role }),
            },
        });

        res.status(STATUS.OK).json(updatedUser);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to update user",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};

export const updateStaff: RequestHandler = async (req, res, next) => {
    const { id } = req.params;
    const staffSchema = z.object({
        name: z.string().min(1, "Name is required").optional(),
        role: z.string().optional(),
        department: z.string().optional(),
        salary: z.number().optional(),
        hireDate: z.string().optional(),
        status: z.string().optional(),
    });

    const parseResult = staffSchema.safeParse(req.body);

    if (!parseResult.success) {
        res.status(STATUS.BAD_REQUEST).json({
            error: "Invalid staff data",
            details: parseResult.error.errors,
        });
        return;
    }

    const { name, role, department, salary, hireDate, status } = parseResult.data;

    try {
        const staff = await prisma.staff.findUnique({ where: { id: String(id) } });
        if (!staff) {
            res.status(STATUS.NOT_FOUND).json({ error: "Staff not found" });
            return;
        }

        const updatedStaff = await prisma.staff.update({
            where: { id: String(id) },
            data: {
                ...(name && { username: name }),
                ...(role && { role }),
                ...(department && { department }),
                ...(salary !== undefined && { salary }),
                ...(hireDate && { hireDate }),
                ...(status && { status }),
            },
        });

        res.status(STATUS.OK).json(updatedStaff);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to update staff",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};

export const getUsersByRole: RequestHandler = async (req, res, next) => {
    const { role } = req.params;
    try {
        const users = await prisma.user.findMany({
            where: { role: role },
        });
        res.status(STATUS.OK).json(users);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch users by role",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};

export const getStaffByRole: RequestHandler = async (req, res, next) => {
    const { role } = req.params;
    try {
        const staff = await prisma.staff.findMany({
            where: { role: role },
        });
        const formattedStaff = staff.map(member => ({
            name: member.username,
            position: member.role + member.department,
            salary: member.salary,
            HireDate: member.hireDate,
            Status: member.status,
        }));
        res.status(STATUS.OK).json(formattedStaff);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to fetch staff by role",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};

export const searchUserByName: RequestHandler = async (req, res, next) => {
    const { name } = req.query;
    if (!name || typeof name !== "string") {
        res.status(STATUS.BAD_REQUEST).json({ error: "Name in query parameter is required" });
        return;
    }
    try {
        const users = await prisma.user.findMany({
            where: {
                username: {
                    contains: name,
                    mode: "insensitive"
                }
            }
        });
        res.status(STATUS.OK).json(users);
    } catch (e) {
        res.status(STATUS.INTERNAL_SERVER_ERROR).json({
            error: "Failed to search users by name",
            details: e instanceof Error ? e.message : String(e),
        });
    }
};