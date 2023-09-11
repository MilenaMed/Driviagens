import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { travelSchema } from "../scheemas/travelsShema.js";
import { postTravels, getTravels } from "../controllers/travelsController.js";

const travelsRouter = Router()

travelsRouter.post("/travels", validateMiddleware(travelSchema),postTravels)
travelsRouter.get("/passengers/travels", getTravels)


export default travelsRouter