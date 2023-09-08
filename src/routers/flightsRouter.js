import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { flightSchema } from "../scheemas/flightsSchema.js";
import { postRegisterFlight } from "../controllers/flightController.js";

const flightsRouter = Router()

flightsRouter.post("/flights", validateMiddleware(flightSchema),postRegisterFlight)

export default flightsRouter