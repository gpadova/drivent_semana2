import { prisma } from "@/config";

async function getTypesQuery() {
    return prisma.ticketType.findMany();
}

async function getTicketsQuery(id: number) {
    return prisma.ticket.findMany({
        where: {
            enrollmentId: id
        },
        include: {
            TicketType: true 
        },
        orderBy: {
            id: "asc"
        }
    });
}
async function findEnrollmentIdQuery(userId: number) {
    return prisma.enrollment.findUnique({
        where: {
            userId
        }
    });
}

async function getTicketTypeInfoByIdQuery(id: number) {
    return prisma.ticketType.findUnique({
        where: {
            id
        }
    })
}

async function insertTicketsQuery(ticketTypeId: number, enrollment: number) {
    return prisma.ticket.create({
        data: {
            ticketTypeId,
            enrollmentId: enrollment,
            status: "RESERVED",
            createdAt: new Date,
            updatedAt: null

        }
    });
}

const ticketsRepository = {
    getTypesQuery,
    getTicketsQuery,
    insertTicketsQuery,
    findEnrollmentIdQuery,
    getTicketTypeInfoByIdQuery
};

export default ticketsRepository;
