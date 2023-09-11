import joi from "joi"

export const flightSchema = joi.object({
    origin: joi.number().required(),
    destination: joi.number().required(),
    date: joi.string().pattern(new RegExp(/^(0[1-9]|1\d|2[0-9]|3[0-1])-(0[1-9]|1[0-2])-\d{4}$/))
        .message('Date format must be dd-mm-yyyy, with valid data')
        .required(),
});