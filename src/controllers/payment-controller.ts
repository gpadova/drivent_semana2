import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import { getPaymentService } from "@/services/payment-service";

export async function getPaymentById (req: AuthenticatedRequest, res: Response) {
    const  ticketId  = req.query.ticketId as string;
    try {
        const ticket = await getPaymentService(ticketId) 
    } catch (error) {
        console.log(error)
        return res.sendStatus(400)
    }
}