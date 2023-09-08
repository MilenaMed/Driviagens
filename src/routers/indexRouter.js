import { Router } from "express"
import registerRouter from "./registerRouter.js"
import flightsRouter from "./flightsRouter.js"
import travelsRouter from "./travelRouter.js"

const router = Router()

router.use(registerRouter)
router.use(flightsRouter)
router.use(travelsRouter)

export default router