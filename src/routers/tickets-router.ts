import { Router } from "express";
import { getTicketTypes, getTickets, insertTickets } from "@/controllers/ticket-controller";
import { authenticateToken, validateBody } from "@/middlewares";

const ticketRouter = Router();

ticketRouter.get("/types", authenticateToken, getTicketTypes);
ticketRouter.get("/", authenticateToken, getTickets);
ticketRouter.post("/", authenticateToken, validateBody, authenticateToken, insertTickets );

export { ticketRouter };
