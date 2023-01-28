import { Response } from "express";
import { AuthenticatedRequest } from "@/middlewares";
import ticketsService from "@/services/ticket-services.ts";
import httpStatus from "http-status";
import * as jwt from "jsonwebtoken";
import { JWTPayload } from "@/middlewares";


export async function getTicketTypes(_req: AuthenticatedRequest, res: Response) {
    try {
        const types = await ticketsService.getTicketTypesService();
        return res.status(httpStatus.OK).send(types);
    } catch (error) {
        return res.sendStatus(httpStatus.NO_CONTENT);
    }
}

export async function getTickets(req: AuthenticatedRequest, res: Response) {
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    try {
        const findEnrollmentId = await ticketsService.findEnrollmentIdService(userId)
        const tickets = await  ticketsService.getTicketsService(findEnrollmentId.id)
        if(!tickets) {
            return res.sendStatus(404);
        }

        const response = tickets.forEach((tic) => {
            "id" : tic.id,
            "status" : tic.status,
            "ticketTypeId" : tic.ticketTypeId,
            "enrollmentId" : findEnrollmentId.id,
            "TicketType" : await ticketsService.getTicketTypeInfoByIdService(tic.enrollmentId),
            "createdAt" : new Date,
            "updatedAt" : new Date
          })
        return res.status(httpStatus.ACCEPTED).send(response);
    } catch (error) {
        return res.sendStatus(httpStatus.UNAVAILABLE_FOR_LEGAL_REASONS)
    }
}

export async function insertTickets(req: AuthenticatedRequest, res: Response) {
    const ticketTypeId : number = req.body.ticketTypeId
    const authHeader = req.header("Authorization");
    const token = authHeader.split(" ")[1];
    const { userId } = jwt.verify(token, process.env.JWT_SECRET) as JWTPayload;
    try {
        const enrollment = await ticketsService.findEnrollmentIdService(userId)
        await ticketsService.insertTicketService(ticketTypeId, enrollment.id );
        
        const tickets = await  ticketsService.getTicketsService(enrollment.id)
        const response = {
            "id" : tickets[0].id,
            "status" : tickets[0].status,
            "ticketTypeId" : tickets[0].ticketTypeId,
            "enrollmentId" : enrollment.id,
            "TicketType" : await ticketsService.getTicketTypeInfoByIdService(enrollment.id),
            "createdAt" : new Date,
            "updatedAt" : new Date
          }
          return res.status(httpStatus.CREATED).send(tickets)
    } catch (error) {
        console.log(error)
        return res.sendStatus(httpStatus.CONFLICT)
    }
}


