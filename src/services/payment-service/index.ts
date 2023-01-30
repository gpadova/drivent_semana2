import { getPaymentRepository, insertIntoDbRepository} from "@/repositories/payment-repository"

export async function getPaymentService(ticketId: string) {
    return await getPaymentRepository(ticketId);
}

export async function insertCardDataService(payment:  Payment) {
    return await insertIntoDbRepository(payment);    
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

