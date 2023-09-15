import httpStatus from "http-status";

export default function errorHandler(error, request, response, next) {

  if (error.type === "conflictCity") {
    return response.status(httpStatus.CONFLICT).send(error.message);
  }

  return response.status(httpStatus.INTERNAL_SERVER_ERROR)
}