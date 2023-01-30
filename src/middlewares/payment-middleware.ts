import { NextFunction, Request, Response } from "express";
import { findPaymentInDb, findTicketIdByEnrollment } from "@/repositories/payment-repository";
import { JWTPayload } from "@/middlewares";
import * as jwt from "jsonwebtoken";
import httpStatus from "http-status";
import { prisma } from "@/config";
import { paymentSchema } from "@/schemas";

export async function verifyTicket(req: Request, res: Response, next: NextFunction) {
    const ticketId  = req.query.ticketId as string;
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    if(!ticketId) {
        return res.sendStatus(400);
    }
    const ticketExists = await findPaymentInDb(ticketId);
    if(!ticketExists) {
        return res.sendStatus(404);
    }
    const ticketIdEnrollment = await findTicketIdByEnrollment(userId);
    const arrayOfIds = ticketIdEnrollment.map(i => i.id);
    if(!arrayOfIds.includes(Number(ticketId))) {
        return res.sendStatus(409);
    }
    next();
}

export async function verifyPaymentBody(req: Request, res: Response, next: NextFunction) {
    const payment = req.body;
    const { error } = paymentSchema.validate(payment, { abortEarly: false})

    if(error) {
        const errors = error.details.map(det => det.message);
        return res.status(400).send(errors);
    }
    next();
}

export async function verifyElementsBody(req: Request, res: Response, next: NextFunction) {
    const payment = req.body as Payment;
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    const ticketIdExists = await prisma.ticket.count({
        where: {
            id: payment.ticketId
        } 
    });
    if(ticketIdExists === 0) {
        return res.sendStatus(404);
    }
    const findEnrollmentId = await prisma.ticket.findUnique({
        where: {
            id: payment.ticketId
        }
    });
    const findUserId = await prisma.enrollment.findUnique({
        where: {
            id: findEnrollmentId.enrollmentId
        }
    });
    if(userId !== findUserId.userId) {
        return res.sendStatus(401);
    }

    next();
}

export type Payment = {
    ticketId: number,
    cardData: {
        issuer: string,
        number: number,
        name: number,
        expirationDate: number,
        cvv: number
    };
};