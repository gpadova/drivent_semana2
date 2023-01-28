import { getPaymentRepository } from "@/repositories/payment-repository"

export async function getPaymentService(ticketId: string) {
    return await getPaymentRepository(ticketId);
}
