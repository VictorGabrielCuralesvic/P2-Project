import express from "express";
import { router  } from "./routes/routes";
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();

const app = express();
const port = 5000;

app.use(cors({
    origin: 'http://localhost:3000', // Ou use '*' para permitir todas as origens
    methods: ['GET', 'POST', 'PUT', 'DELETE'], // Especifique os métodos permitidos
    allowedHeaders: ['Content-Type', 'Authorization'], // Especifique os headers permitidos
  }));

app.use(express.json());
app.use(router);

app.listen(port, () => {
    console.log("Server running on port: " + port);
});