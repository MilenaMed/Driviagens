import express from "express";
import "express-async-errors";
import cors from "cors"
import router from "./routers/indexRouter.js";
import dotenv from "dotenv"
import errorHandler from "./middlewares/errorsMiddleware.js";

const app = express();

//Ferramentas
dotenv.config()
app.use(cors())
app.use(express.json())
app.use(router)
app.use(errorHandler)



//Port
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})