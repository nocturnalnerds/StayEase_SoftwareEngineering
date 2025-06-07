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

dotenv.config();

const prisma = new PrismaClient();

const s3Client = new S3Client({
    endpoint: process.env.WASABI_ENDPOINT,
    region: process.env.WASABI_REGION,
    credentials: {
        accessKeyId: process.env.WASABI_KEY!,
        secretAccessKey: process.env.WASABI_SECRET!
    }
});

const upload = multer({
    storage: multerS3({
        s3: s3Client,
        bucket: process.env.WASABI_BUCKET!,
        acl: 'public-read',
        contentType: multerS3.AUTO_CONTENT_TYPE,
        key: (req, file, cb) => cb(null, `roomTypesImage/${Date.now()}-${file.originalname}`)
    })
});

const roomTypeSchema = z.object({
    name: z.string(),
    description: z.string(),
    basePrice: z.coerce.number(),
    capacity: z.coerce.number().int(),
    maxOccupancy: z.coerce.number().int(),
    amenities: z.array(z.string()),
    // images handled via file upload, not directly from body
});

// Get all room types
export const getAllRoomType: RequestHandler = async (req, res, next) => {
    try {
        const rooms = await prisma.roomType.findMany();
        
        const roomsWithPresignedImages = await Promise.all(
            rooms.map(async (room) => {
            // If the first image is already a URL (starts with http:// or https://), skip presigning
            if (
                room.images &&
                Array.isArray(room.images) &&
                room.images.length > 0 &&
                (room.images[0].startsWith("http://") || room.images[0].startsWith("https://"))
            ) {
                return room;
            }
            if (!room.images || !Array.isArray(room.images)) {
                return { ...room, images: [] };
            }
            const presignedImages = await Promise.all(
                room.images.map(async (imageKey: string) => {
                const command = new GetObjectCommand({
                    Bucket: process.env.WASABI_BUCKET!,
                    Key: imageKey,
                });
                return getSignedUrl(s3Client, command, { expiresIn: 3600 });
                })
            );
            return { ...room, images: presignedImages };
            })
        );

        res.status(STATUS.OK).json(roomsWithPresignedImages);
    } catch (e) {
        next(e);
    }
};

export const getRoomTypeById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const roomType = await prisma.roomType.findUnique({
            where: { id: Number(id) }
        });
        if (!roomType) {
            res.status(STATUS.NOT_FOUND).json({ message: "Room type not found" });
            return;
        }

        let images: string[] = [];
        if (roomType.images && Array.isArray(roomType.images)) {
            // If the first image is already a URL (starts with http:// or https://), skip presigning
            if (
                roomType.images.length > 0 &&
                roomType.images.every((img: string) =>
                    img.startsWith("http://") || img.startsWith("https://")
                )
            ) {
            images = roomType.images;
            } else {
            images = await Promise.all(
                roomType.images.map(async (imageKey: string) => {
                const command = new GetObjectCommand({
                    Bucket: process.env.WASABI_BUCKET!,
                    Key: imageKey,
                });
                return getSignedUrl(s3Client, command, { expiresIn: 3600 });
                })
            );
            }
        }

        res.status(STATUS.OK).json({ ...roomType, images });
    } catch (e) {
        next(e);
    }
};

export const addRoomTypes: RequestHandler[] = [
    upload.array('files'),
    async (req, res, next) => {
        try {
            const parseResult = roomTypeSchema.safeParse(req.body);
            if (!parseResult.success) {
                res.status(STATUS.BAD_REQUEST).json({
                    message: "Invalid input",
                    errors: parseResult.error.errors
                });
                return;
            }

            const { name, description, basePrice, capacity, maxOccupancy, amenities } = parseResult.data;

            const files = req.files as Express.MulterS3.File[];
            const images: string[] = files ? files.map(file => file.key) : [];

            const newRoomType = await prisma.roomType.create({
                data: {
                    id: (await prisma.roomType.count()) + 1,
                    name,
                    description,
                    basePrice,
                    capacity,
                    maxOccupancy,
                    amenities,
                    images
                    // Do NOT include 'id' here; let Prisma auto-generate it
                }
            });

            res.status(STATUS.CREATED).json(newRoomType);
        } catch (e) {
            next(e);
        }
    }
];

export const deleteRoomType: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        const roomType = await prisma.roomType.findUnique({
            where: { id: Number(id) }
        });

        if (!roomType) {
            res.status(STATUS.NOT_FOUND).json({ message: "Room type not found" });
            return;
        }

        await prisma.roomType.delete({
            where: { id: Number(id) }
        });

        res.status(STATUS.OK).json({ message: "Room type deleted successfully" });
    } catch (e) {
        next(e);
    }
};


export const getAllRooms: RequestHandler = async (req, res, next) => {
    try {
        const rooms = await prisma.room.findMany({
        include: {
            roomType: true,
        },
    });

    res.status(STATUS.OK).json(rooms);
    } catch (e) {
        next(e);
    }
};

export const getRoomById: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        const room = await prisma.room.findUnique({
            where: { id: Number(id) },
                include: {
                    roomType: true,
                },
        });

        if (!room) {
            res.status(STATUS.NOT_FOUND).json({ message: "Room not found" });
            return;
        }

        res.status(STATUS.OK).json(room);
    } catch (e) {
        next(e);
    }
};

export const updateRoomAvailability: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        
        await prisma.room.update({
            where: { id: Number(id) },
            data: { status: "Occupied" }
        });

        res.status(STATUS.OK).json({message: "Room Has Updated to Occupied"});
    }catch(e){
        next(e);
    }
};

export const updateRoomCleaningDate: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { cleaningDate } = req.body;

        if (!cleaningDate) {
            res.status(STATUS.BAD_REQUEST).json({ message: "Cleaning date is required" });
            return;
        }
        // Change status to "Being Cleaned"
        await prisma.room.update({
            where: { id: Number(id) },
            data: { status: "Being Cleaned" }
        });

        // Schedule update of lastCleaned after 30 minutes using node-cron

        cron.schedule(
            new Date(Date.now() + 30 * 60 * 1000).toISOString().slice(14, 19) + " * * * *",
            async () => {
            await prisma.room.update({
                where: { id: Number(id) },
                data: { lastCleaned: new Date(cleaningDate) }
            });
            },
            { timezone: "UTC" }
        );
        const updatedRoom = await prisma.room.update({
            where: { id: Number(id) },
            data: { lastCleaned: new Date(cleaningDate) }
        });

        res.status(STATUS.OK).json({ message: "Room cleaning date updated", room: updatedRoom });
    } catch (e) {
        next(e);
    }
};

export const addNewRooms: RequestHandler = async (req, res, next) => {
    try {
        const { roomTypeId, roomNumber, floor, smoking, notes } = req.body;

        if (!roomTypeId || !roomNumber || !floor) {
            res.status(STATUS.BAD_REQUEST).json({ message: "Missing required fields" });
            return;
        }

        const newRoom = await prisma.room.create({
            data: {
                roomTypeId: Number(roomTypeId),
                roomNumber: String(roomNumber),
                floor: Number(floor),
                lastCleaned: new Date(),
                smoking: (smoking === 'Smoking'),
                notes: String(notes),
            }
        });

        res.status(STATUS.CREATED).json({ message: "Room created successfully", room: newRoom });
    } catch (e) {
        next(e);
    }
};

export const deleteRoom: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;

        const room = await prisma.room.findUnique({
            where: { id: Number(id) }
        });

        if (!room) {
            res.status(STATUS.NOT_FOUND).json({ message: "Room not found" });
            return;
        }

        await prisma.room.delete({
            where: { id: Number(id) }
        });

        res.status(STATUS.OK).json({ message: "Room deleted successfully" });
    } catch (e) {
        next(e);
    }
};

export const getRoomDashboardData: RequestHandler = async (req, res, next) => {
    try {
        const totalRoomTypes = await prisma.roomType.count();
        const totalRooms = await prisma.room.count();
        const availableRooms = await prisma.room.count({ where: { status: "Available" } });
        // Get average prices for each room type
        const avgPrices = await prisma.roomType.groupBy({
            by: ['name'],
            _avg: { basePrice: true }
        });
        const averagePrices = avgPrices.map(item => ({
            name: item.name,
            averageBasePrice: item._avg.basePrice
        }));

        

        res.status(STATUS.OK).json({
            totalRooms,
            availableRooms,
            totalRoomTypes,
            averagePrices
        });
    } catch (e) {
        next(e);
    }
};

export const updateRoom: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { roomTypeId, roomNumber, floor, smoking, notes, status, lastCleaned } = req.body;

        const room = await prisma.room.findUnique({
            where: { id: Number(id) }
        });

        if (!room) {
            res.status(STATUS.NOT_FOUND).json({ message: "Room not found" });
            return;
        }

        const updatedRoom = await prisma.room.update({
            where: { id: Number(id) },
            data: {
                ...(roomTypeId !== undefined && { roomTypeId: Number(roomTypeId) }),
                ...(roomNumber !== undefined && { roomNumber: String(roomNumber) }),
                ...(floor !== undefined && { floor: Number(floor) }),
                ...(smoking !== undefined && { smoking: smoking === 'Smoking' || smoking === true }),
                ...(notes !== undefined && { notes: String(notes) }),
                ...(status !== undefined && { status: String(status) }),
                ...(lastCleaned !== undefined && { lastCleaned: new Date(lastCleaned) }),
            }
        });
        res.status(STATUS.OK).json({ message: "Room updated successfully", room: updatedRoom });
    } catch (e) {
        next(e);
    }
};

export const updateRoomType: RequestHandler = async (req, res, next) => {
    try {
        const { id } = req.params;
        const parseResult = roomTypeSchema.safeParse(req.body);

        if (!parseResult.success) {
            res.status(STATUS.BAD_REQUEST).json({
                message: "Invalid input",
                errors: parseResult.error.errors
            });
            return;
        }

        const { name, description, basePrice, capacity, maxOccupancy, amenities } = parseResult.data;

        // Optionally handle images update if needed
        let images: string[] | undefined = undefined;
        if (req.files && Array.isArray(req.files)) {
            const files = req.files as Express.MulterS3.File[];
            images = files.map(file => file.key);
        }

        const existingRoomType = await prisma.roomType.findUnique({
            where: { id: Number(id) }
        });

        if (!existingRoomType) {
            res.status(STATUS.NOT_FOUND).json({ message: "Room type not found" });
            return;
        }

        const updatedRoomType = await prisma.roomType.update({
            where: { id: Number(id) },
            data: {
                name,
                description,
                basePrice,
                capacity,
                maxOccupancy,
                amenities,
                ...(images ? { images } : {})
            }
        });

        res.status(STATUS.OK).json({ message: "Room type updated successfully", roomType: updatedRoomType });
    } catch (e) {
        next(e);
    }
};