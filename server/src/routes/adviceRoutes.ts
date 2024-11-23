import { Router } from "express";
import { getFinanceNews } from "../controller/adviceController";

const newsRoutes = Router();

newsRoutes.get("/news/finance", getFinanceNews);

export default newsRoutes;
