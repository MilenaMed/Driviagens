import { errors } from "../erros/errors.js";

export function validateMiddleware(schema) {
    return (request, response, next) => {

        const validation = schema.validate(request.body);
        if (validation.error) {
            return response.send(validation.error.details[0].message)
        }
        next();
    }
}