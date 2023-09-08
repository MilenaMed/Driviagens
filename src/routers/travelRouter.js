import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { travelSchema } from "../scheemas/travelsShema.js";
import { postTravels } from "../controllers/travelsController.js";

const travelsRouter = Router()

travelsRouter.post("/travels", validateMiddleware(travelSchema),postTravels)

export default travelsRouter