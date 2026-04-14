import express from "express";
import { router } from "./routes/routes";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())
app.use("/estoque", router)

app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando!"})
})

app.listen(PORT, () => console.log(`Servidor iniciado em localhost:${PORT}!`))