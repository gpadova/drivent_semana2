import Joi from "joi";

export const paymentSchema = Joi.object({
    ticketId: Joi.number().required(),
    cardData: {
        issuer: Joi.string().valid("MATERECARD", "VISA").required(),
        number: Joi.number().min(16).max(16).required(),
        name: Joi.number().required(),
        expirationDate: Joi.number().integer().min(2023).max(2035),
        cvv: Joi.number().min(3).max(3).required()
    }  
});
