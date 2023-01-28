import { ticketSchema } from "@/schemas/ticketsSchema";
import { NextFunction, Request, Response } from "express";
import httpStatus from "http-status";

export async function validateTicketBody(req: Request, res: Response, next: NextFunction) {
    const ticket = req.body;
    const { error } = ticketSchema.validate(ticket, { abortEarly: false})

    if(error) {
        const errors = error.details.map(det => det.message);
        return res.status(httpStatus.NOT_ACCEPTABLE).send(errors);
    }
    next();
}
