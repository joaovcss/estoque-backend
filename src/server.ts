import express from "express";

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.json())

app.get("/", (req, res) => {
  res.json({ message: "Servidor rodando!"})
})

app.listen(PORT, () => console.log(`Servidor iniciado em localhost:${PORT}!`))