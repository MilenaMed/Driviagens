import { errors } from "../erros/errors.js";

export function validateMiddleware(schema) {
    return (request, response, next) => {

        const validation = schema.validate(request.body);
        if (validation.error) throw errors.wrongData()
        next();
    }
}