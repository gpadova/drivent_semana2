import { Router } from "express";
import { verifyTicket, verifyPaymentBody, verifyElementsBody } from "@/middlewares/payment-middleware";
import { getPaymentById, insertPaymentInDb } from "@/controllers";
import { authenticateToken } from "@/middlewares";

const paymentRouter = Router();

paymentRouter.get("/", authenticateToken, verifyTicket, getPaymentById);
paymentRouter.post("/process", authenticateToken, verifyPaymentBody, verifyElementsBody, insertPaymentInDb);

export { paymentRouter };
