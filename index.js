import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import cookieParser from "cookie-parser";
import * as dotenv from "dotenv";
import seedRouter from "./routes/seedRoute.js";
import productsRouter from "./routes/productsRoute.js";
import userRouter from "./routes/userRoute.js";

dotenv.config();
const PORT =
  process.env.API_URL ||
  `https://pizza-react-server-production.up.railway.app/`;
const app = express();
app.use(express.json()); //передавать объект {extended:true} не нужно??
mongoose
  // .connect(process.env.DB_URL_COMPASS)
  .connect(process.env.DB_URL)
  .then(() => console.log("DB IS OK"))
  .catch((err) => console.log("DB is ERR", err));

app.use(cors());
app.use(cookieParser());
app.use("/api/seed", seedRouter);
app.use("/api/auth", userRouter);
app.use("/api/products", productsRouter);
app.use("/uploads", express.static("uploads")); //модуль path не нужно подключать для определения пути загрузки?
app.use("/api/upload", productsRouter);
//res.json({ url: `/uploads/${req.file.originalname}_${Date.now()}` });

const start = () => {
  try {
    app.listen(`0.0.0.0:$PORT`, () =>
      console.log(`Server started on port ${PORT}`)
    );
  } catch (e) {
    console.log(e);
  }
};

start();
