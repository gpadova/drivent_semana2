import Joi from "joi";

export const paymentSchema = Joi.object({
    
        id: Joi.number().required(),
        ticketId: Joi.number().required(),,
        value: Joi.number().required(),
        cardIssuer: Joi.string().valid("VISA" , "MASTERCARD").required(),
        cardLastDigits: Joi.string().required().min(4).max(4).required(),
        createdAt: Joi.string().required(),
        updatedAt: Joi.string().required(),
      
});