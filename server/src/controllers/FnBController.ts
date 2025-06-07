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
        key: (req, file, cb) => cb(null, `foodItemImages/${Date.now()}-${file.originalname}`)
    })
});

export const getAllMenus: RequestHandler = async (req,res, next) => {
    try {
        const foodItems = await prisma.foodItem.findMany();

        const foodItemsWithUrls = await Promise.all(
            foodItems.map(async (item) => {
                let imageUrl = null;
                if (item.image && (item.image.startsWith("http://") || item.image.startsWith("https://"))) {
                    imageUrl = item.image;
                } else if (item.image) {
                    const command = new GetObjectCommand({
                        Bucket: process.env.WASABI_BUCKET!,
                        Key: item.image
                    });
                    imageUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
                }
                return {
                    ...item,
                    imageUrl
                };
            })
        );

        res.status(STATUS.OK).json({ foodItems: foodItemsWithUrls });
    } catch (error) {
        next(error);
    }
}

export const getMenuById: RequestHandler = async (req, res, next) => {
    try {
        const id = parseInt(req.params.id, 10);
        if (isNaN(id)) {
            res.status(STATUS.BAD_REQUEST).json({ error: "Invalid menu id" });
            return;
        }

        const foodItem = await prisma.foodItem.findUnique({ where: { id } });

        if (!foodItem) {
            res.status(STATUS.NOT_FOUND).json({ error: "Menu not found" });
            return;
        }

        let imageUrl = null;
        if (foodItem.image && (foodItem.image.startsWith("http://") || foodItem.image.startsWith("https://"))) {
            imageUrl = foodItem.image;
        } else if (foodItem.image) {
            const command = new GetObjectCommand({
                Bucket: process.env.WASABI_BUCKET!,
                Key: foodItem.image
            });
            imageUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
        }

        res.status(STATUS.OK).json({ ...foodItem, imageUrl });
        return;
    } catch (error) {
        next(error);
    }
};

export const addMenu: RequestHandler[] = [
    upload.single("image"),                     // <-- handles the file upload to Wasabi
    async (req, res, next) => {
        try {
        /* -------- validate & coerce text fields -------- */
        const schema = z.object({
            name: z.string().min(1),
            description: z.string().optional(),
            price: z.coerce.number().positive(),
            category: z.string().min(1),
            preparationTime: z.coerce.number().int().nonnegative(),
            ingredients: z.array(z.string()),
            alergen: z.array(z.string()),
            avialability: z.coerce.boolean()
        });

        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }
        const { name, category, description, price, preparationTime, ingredients, alergen, avialability} = parsed.data;

        const file = req.file as Express.MulterS3.File | undefined;
        const imageKey = file?.key ?? null;

        const newMenu = await prisma.foodItem.create({
            data: {
                name,
                category,
                description: description ?? "",
                price,
                image: imageKey,
                preparationTime,
                ingredients,
                allergens: alergen,
                isAvailable: avialability,
            }
        });
            res.status(STATUS.CREATED).json({ ...newMenu });
        } catch (error) {
            next(error);
        }
    }
];

export const getMenusByCategory: RequestHandler = async (req, res, next) => {
    try {
        const { category } = req.params;
        if (!category) {
            res.status(STATUS.BAD_REQUEST).json({ error: "Category is required" });
            return;
        }

        const foodItems = await prisma.foodItem.findMany({
            where: { category }
        });

        const foodItemsWithUrls = await Promise.all(
            foodItems.map(async (item) => {
                let imageUrl = null;
                if (item.image && (item.image.startsWith("http://") || item.image.startsWith("https://"))) {
                    imageUrl = item.image;
                } else if (item.image) {
                    const command = new GetObjectCommand({
                        Bucket: process.env.WASABI_BUCKET!,
                        Key: item.image
                    });
                    imageUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
                }
                return {
                    ...item,
                    imageUrl
                };
            })
        );

        res.status(STATUS.OK).json({ foodItems: foodItemsWithUrls });
    } catch (error) {
        next(error);
    }
};


export const addFoodCategory: RequestHandler = async (req, res, next) => {
    try {
        const schema = z.object({
            name: z.string().min(1),
        });

        const parsed = schema.safeParse(req.body);
        if (!parsed.success) {
            res.status(STATUS.BAD_REQUEST).json({ error: parsed.error.errors });
            return;
        }

        const { name } = parsed.data;

        const existingCategory = await prisma.foodCategory.findUnique({
            where: { name }
        });

        if (existingCategory) {
            res.status(STATUS.BAD_REQUEST).json({ error: "Category already exists" });
            return;
        }

        const newCategory = await prisma.foodCategory.create({
            data: {
                name
            }
        });

        res.status(STATUS.CREATED).json(newCategory);
    } catch (error) {
        next(error);
    }
};

export const getAllCategories: RequestHandler = async (req, res, next) => {
    try {
        const categories = await prisma.foodCategory.findMany();
        res.status(STATUS.OK).json({ categories });
    } catch (error) {
        next(error);
    }
};


export const getMenuByName: RequestHandler = async (req, res, next) => {
    try {
        const { name } = req.params;
        if (!name) {
            res.status(STATUS.BAD_REQUEST).json({ error: "Name is required" });
            return;
        }

        const foodItems = await prisma.foodItem.findMany({
            where: {
                name: {
                    contains: name,
                    mode: "insensitive"
                }
            }
        });

        const foodItemsWithUrls = await Promise.all(
            foodItems.map(async (item) => {
                let imageUrl = null;
                if (item.image && (item.image.startsWith("http://") || item.image.startsWith("https://"))) {
                    imageUrl = item.image;
                } else if (item.image) {
                    const command = new GetObjectCommand({
                        Bucket: process.env.WASABI_BUCKET!,
                        Key: item.image
                    });
                    imageUrl = await getSignedUrl(s3Client, command, { expiresIn: 3600 });
                }
                return {
                    ...item,
                    imageUrl
                };
            })
        );

        res.status(STATUS.OK).json({ foodItems: foodItemsWithUrls });
    } catch (error) {
        next(error);
    }
};

export const getRestaurantDashboard: RequestHandler = async (req, res, next) => {
    try {
        const totalMenus = await prisma.foodItem.count();

        const totalCategories = await prisma.foodCategory.count();

        const availableMenus = await prisma.foodItem.count({ where: { isAvailable: true } });
        const averagePriceResult = await prisma.foodItem.aggregate({
            _avg: { price: true }
        });
        const averagePrice = averagePriceResult._avg.price ?? 0;


        res.status(STATUS.OK).json({
            totalMenus,
            totalCategories,
            availableMenus,
            averagePrice
        });
    } catch (error) {
        next(error);
    }
};