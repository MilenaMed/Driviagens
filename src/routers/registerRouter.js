import { Router } from "express";
import { validateMiddleware } from "../middlewares/validateMiddleware.js";
import { userSchema , citieSchema} from "../scheemas/registerSchema.js";
import { postRegisterUser } from "../controllers/registerController.js";

const registerRouter = Router()

registerRouter.post("/passengers", validateMiddleware(userSchema), postRegisterUser)
registerRouter.post("/cities", validateMiddleware(citieSchema))

export default registerRouter