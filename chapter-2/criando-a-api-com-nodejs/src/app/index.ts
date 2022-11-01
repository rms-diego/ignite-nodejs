import express from "express";
import morgan from "morgan";
import { categoriesRoutes } from "../routes/categoriesRoutes";

const app = express();

app.use(express.json());
app.use(morgan("dev"));
app.use(categoriesRoutes);

export default app;
