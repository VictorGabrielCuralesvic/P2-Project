import axios from "axios";
import { Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const API_URL = "https://newsapi.org/v2/top-headlines";

export const getFinanceNews = async (req: Request, res: Response) => {
    try {
      const { country = "br", language = "pt", pageSize = 10 } = req.query;
  
      const response = await axios.get(API_URL, {
        params: {
          country,
          language,
          pageSize,
          category: "business",
          apiKey: process.env.NEWS_API_KEY,
        },
      });
  
      if (!response.data.articles || response.data.articles.length === 0) {
        return res.status(404).json({ message: "Nenhuma notícia encontrada." });
      }
  
      const articles = response.data.articles.map((article: any) => ({
        title: article.title,
        description: article.description,
        url: article.url,
        source: article.source.name,
        publishedAt: article.publishedAt,
      }));
  
      return res.status(200).json({ articles });
    } catch (error) {
      console.error("Erro ao buscar notícias de finanças:", error);
      return res.status(500).json({ message: "Falha ao buscar notícias", error });
    }
  };