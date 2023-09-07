import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { userSchema , citySchema} from "../scheemas/registerSchema.js";
import { postRegisterUser, postRegisterCity} from "../controllers/registerController.js";

const registerRouter = Router()

registerRouter.post("/passengers", validateMiddleware(userSchema), postRegisterUser)
registerRouter.post("/cities", validateMiddleware(citySchema), postRegisterCity)

export default registerRouter