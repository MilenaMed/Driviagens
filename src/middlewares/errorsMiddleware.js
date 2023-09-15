import httpStatus from "http-status";

export default function errorHandler(error, request, response, next) {

  if (error.type === "conflictCity") {
    return response.status(httpStatus.CONFLICT).send(error.message);
  }

  if(error.type === "wrongData"){
    return response.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message)
  }

  if (error.type === "sameCities") {
    return response.status(httpStatus.CONFLICT).send(error.message);
  }

  if (error.type === "notFoundData") {
    return response.status(httpStatus.NOT_FOUND).send(error.message);
  }

  if (error.type === "notFoundCity") {
    return response.status(httpStatus.NOT_FOUND).send(error.message);
  }

  if(error.type === "invalidDate"){
    return response.status(httpStatus.UNPROCESSABLE_ENTITY).send(error.message);
  }

  if (error.type === "tooMany") {
    return response.status(httpStatus.INTERNAL_SERVER_ERROR).send(error.message);
  }
  return response.status(httpStatus.INTERNAL_SERVER_ERROR)
}