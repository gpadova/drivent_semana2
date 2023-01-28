import { prisma } from "@/config";
import { ParsedQs } from "qs";

export async function findPaymentInDb(ticketId: string | ParsedQs | string[] | ParsedQs[]) {
    return prisma.ticket.findUnique({
        where: {
            id: Number(ticketId)
        }
    });
}

export async function findTicketIdByEnrollment(userId: number) {
    const enrollmentIdFind = await prisma.enrollment.findUnique({
        where: {
            userId
        }
    });

    const ticketId = await prisma.ticket.findMany({
        where: {
            enrollmentId: enrollmentIdFind.id
        }
    });
    return ticketId;
}

export async function getPaymentRepository(ticketId: string) {
    return prisma.payment.findMany({
        where: {
            ticketId: Number(ticketId)
        }
    });
}
