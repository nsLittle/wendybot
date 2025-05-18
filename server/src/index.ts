import express from "express";
import OpenAI from "openai";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import askRoute from "./routes/ask";

dotenv.config({
  path: path.resolve(__dirname, "../.env"),
});

const apiKey = process.env.OPENAI_API_KEY as string;

const app = express();
const PORT = process.env.PORT || 8000;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  })
);
app.use(express.json());
app.use("/api/ask", askRoute);

app.get("/", (_req, res) => {
  res.send("WendyBot backend is running");
});

app.listen(PORT, () => {
  console.log(`Server listening on http://localhost:${PORT}`);
});
