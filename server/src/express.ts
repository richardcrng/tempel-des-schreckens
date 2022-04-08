import express from "express";
import cors from "cors";

const app = express();
app.use(cors());

app.get("/ping", (req, res) => {
  res.json({ status: "success" });
});

export default app;
