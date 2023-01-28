import { Router } from "express";
import { verifyTicket, validatePaymentBody } from "@/middlewares/payment-middleware";

const paymentRouter = Router();

paymentRouter.get("/", verifyTicket, validatePaymentBody)

export default paymentRouter;
