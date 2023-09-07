import express from "express";
import router from "./routers/indexRouter.js";
import dotenv from "dotenv"

const app = express();

//Ferramentas
app.use(express.json())
app.use(router)
dotenv.config()


//Port
const port = process.env.PORT || 5000
app.listen(port, () => {
	console.log(`Servidor rodando na porta ${port}`)
})