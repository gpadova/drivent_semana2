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

export async function insertIntoDbRepository(payment: Payment) {
    const cardLast = String(payment.cardData.number).slice(-4)
    const ticketTypeId = await prisma.ticket.findUnique({
        where: {
            id: payment.ticketId
        }
    });
    const ticketType = await prisma.ticketType.findUnique({
        where: {
            id: ticketTypeId.id
        }
    });
    
    return await prisma.payment.create({
        data: {
            ticketId: payment.ticketId,
            value: ticketType.price,
            cardIssuer: payment.cardData.issuer,
            cardLastDigits: cardLast,
            createdAt: new Date(),
            updatedAt: null
        },
    });
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
