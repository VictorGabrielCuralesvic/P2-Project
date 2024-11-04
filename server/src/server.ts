import express from "express";
import routes from "./routes/routes";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// Configuração do CORS
app.use(
  cors({
    origin: "http://localhost:3000", // Ou '*' para todas as origens
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Middleware para JSON
app.use(express.json());

// Usando as rotas importadas
app.use(routes);

// Iniciando o servidor
app.listen(port, () => {
  console.log(`Server running on port: ${port}`);
});