import { RequestHandler } from "express";
import { PrismaClient, Prisma } from "@prisma/client";
import ExcelJS from "exceljs";
import PDFDocument from "pdfkit";
import { STATUS } from "../utils/http/statusCodes";

const prisma = new PrismaClient();

/** Type for payments with all needed nested data */
type PaymentWithDetails = Prisma.PaymentGetPayload<{
    include: {
        reservation: {
            include: {
                customer: true;
            };
        };
        processedBy: true;
    };
}>;

export const generatePaymentReport: RequestHandler = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            include: {
                reservation: {
                    include: {
                        customer: true,
                    },
                },
                processedBy: true,
            },
        });

        if (!payments.length) {
            res.status(STATUS.NOT_FOUND).json({ message: "No payments found" });
            return;
        }

        // 2. DETERMINE FORMAT
        const format = (req.query.format as string)?.toLowerCase() ?? "xlsx";

        if (format === "pdf") {
            const buffer = await buildPdf(payments);
            res.setHeader("Content-Disposition", `attachment; filename=payment_report.pdf`);
            res.setHeader("Content-Type", "application/pdf");
            res.status(STATUS.OK).send(buffer);
        } else {
            const buffer = await buildExcel(payments);
            res.setHeader("Content-Disposition", `attachment; filename=payment_report.xlsx`);
            res.setHeader(
                "Content-Type",
                "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
            );
            res.status(STATUS.OK).send(buffer);
        }
    } catch (error) {
        res
        .status(STATUS.INTERNAL_SERVER_ERROR)
        .json({ message: "Failed to generate payment report", error });
    }
};

async function buildExcel(payments: PaymentWithDetails[]) {
    const wb = new ExcelJS.Workbook();
    const ws = wb.addWorksheet("Payments");

    ws.columns = [
        { header: "Payment ID", key: "id", width: 10 },
        { header: "Reservation ID", key: "reservationId", width: 14 },
        { header: "Payment #", key: "paymentNumber", width: 14 },
        { header: "Amount", key: "amount", width: 12 },
        { header: "Method", key: "paymentMethod", width: 12 },
        { header: "Status", key: "paymentStatus", width: 12 },
        { header: "Transaction ID", key: "transactionId", width: 18 },
        { header: "Date", key: "paymentDate", width: 18 },
        { header: "Processed By", key: "processedBy", width: 18 },
        { header: "Customer", key: "customer", width: 24 },
        { header: "Phone", key: "phone", width: 16 },
        { header: "Notes", key: "notes", width: 30 },
    ] as Partial<ExcelJS.Column>[];

    payments.forEach((p) =>
        ws.addRow({
            id: p.id,
            reservationId: p.reservationId,
            paymentNumber: p.paymentNumber,
            amount: p.amount,
            paymentMethod: p.paymentMethod,
            paymentStatus: p.paymentStatus,
            transactionId: p.transactionId ?? "—",
            paymentDate: p.paymentDate,
            processedBy: p.processedBy
                ? `${p.processedBy.firstName} ${p.processedBy.lastName}`
                : "—",
            customer: `${p.reservation.customer.firstName} ${p.reservation.customer.lastName}`,
            phone: p.reservation.customer.phone,
            notes: p.notes ?? "",
        })
    );

    ws.getRow(1).font = { bold: true };
    ws.getColumn("amount").numFmt = '#,##0.00" $"';
    ws.getColumn("paymentDate").numFmt = "yyyy-mm-dd hh:mm";

    return wb.xlsx.writeBuffer();
}

function buildPdf(payments: PaymentWithDetails[]): Promise<Buffer> {
    return new Promise((resolve, reject) => {
        const doc = new PDFDocument({
        size: "A4",
        margin: 40,
        bufferPages: true,
    });

    const chunks: Buffer[] = [];
    doc.on("data", (chunk) => chunks.push(chunk));
    doc.on("end", () => resolve(Buffer.concat(chunks)));
    doc.on("error", reject);

    doc.fontSize(18).text("Payment Report", { align: "center" });
    doc.moveDown(1.5);

    const colWidths = [70, 70, 55, 60, 70, 120];
    const headers = ["Pay. ID", "Reservation", "Amount", "Method", "Date", "Customer"];
    headers.forEach((h, i) => {
        doc.fontSize(10).text(h, doc.x + colWidths.slice(0, i).reduce((a, b) => a + b, 0), doc.y, {
            width: colWidths[i],
            continued: i < headers.length - 1,
            underline: true,
        });
    });
    doc.moveDown(0.5);

    payments.forEach((p) => {
        const cells = [
            p.id.toString(),
            p.reservationId.toString(),
            `$${p.amount.toFixed(2)}`,
            p.paymentMethod,
            p.paymentDate.toISOString().split("T")[0],
            `${p.reservation.customer.firstName} ${p.reservation.customer.lastName}`,
        ];
        cells.forEach((c, i) => {
            doc.fontSize(9).text(c, doc.x + colWidths.slice(0, i).reduce((a, b) => a + b, 0), doc.y, {
            width: colWidths[i],
            continued: i < cells.length - 1,
            });
        });
        doc.moveDown(0.2);
    });

    // Footer
    const pageCount = doc.bufferedPageRange().count;
    for (let i = 0; i < pageCount; i++) {
        doc.switchToPage(i);
        doc.fontSize(8).text(`Page ${i + 1} of ${pageCount}`, 0.5 * (doc.page.width - 50), doc.page.height - 40);
    }
    doc.end();
    });
}


export const getDashboardStats: RequestHandler = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);

        // Today's revenue
        const todayRevenue = await prisma.payment.aggregate({
            _sum: { amount: true },
            where: {
                paymentDate: {
                    gte: today,
                    lt: tomorrow,
                },
                paymentStatus: "COMPLETED",
            },
        });

        // Pending payments count
        const pendingPayments = await prisma.payment.count({
            where: {
                paymentStatus: "PENDING",
            },
        });

        // Total transactions count
        const totalTransactions = await prisma.payment.count();

        res.status(STATUS.OK).json({
            todayRevenue: todayRevenue._sum.amount ?? 0,
            pendingPayments,
            totalTransactions,
        });
    } catch (error) {
        res
            .status(STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to fetch dashboard stats", error });
    }
};

export const getAllPayments: RequestHandler = async (req, res) => {
    try {
        const payments = await prisma.payment.findMany({
            select: {
                id: true,
                reservation: true,
                reservationId: true,
                paymentNumber: true,
                amount: true,
                paymentMethod: true,
                paymentStatus: true,
                paymentType: true,
                transactionId: true,
                paymentDate: true,
            },
            orderBy: {
            paymentDate: "desc",
            },
        });

        res.status(STATUS.OK).json(payments);
    } catch (error) {
        res
            .status(STATUS.INTERNAL_SERVER_ERROR)
            .json({ message: "Failed to fetch payments", error });
    }
};