import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { getPaymentService, insertCardDataService } from "@/services/payment-service";

export async function getPaymentById(req: AuthenticatedRequest, res: Response) {
    const  ticketId  = req.query.ticketId as string;
    try {
        const ticket = await getPaymentService(ticketId);
        return res.send(ticket).status(201); 
    } catch (error) {
        return res.sendStatus(400);
    }
}

export async function insertPaymentInDb(req: AuthenticatedRequest, res: Response) {
    const payment = req.body as Payment;
    try {
        const user = await insertCardDataService(payment);
        return res.send(user).status(200);
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
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
