import ticketsRepository from "@/repositories/tickets-repository"

async function getTicketTypesService() {
    const types = await ticketsRepository.getTypesQuery();
    return types;
}

async function getTicketsService(id: number) {
    return await ticketsRepository.getTicketsQuery(id);
}

async function findEnrollmentIdService(userId: number) {
    return ticketsRepository.findEnrollmentIdQuery(userId);
}

async function insertTicketService(ticketTypeId: number, enrollment:) {
    const response = await ticketsRepository.insertTicketsQuery(ticketTypeId, enrollment);
    return response;
}

async function getTicketTypeInfoByIdService(id: number) {
    return await ticketsRepository.getTicketTypeInfoByIdQuery(id)};

export type ticketType = {
    ticketTypeId: number
}

const ticketsService = {
    getTicketTypesService,
    getTicketsService,
    insertTicketService,
    findEnrollmentIdService,
    getTicketTypeInfoByIdService
};

export default ticketsService;
