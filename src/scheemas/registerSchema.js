import joi from "joi"

export const userSchema = joi.object({
    firstName: joi.string().min(2).max(100).required(),
    lastName: joi.string().min(2).max(100).required(),
});

export const citySchema = joi.object({
    name: joi.string().min(2).max(50).required(),
});