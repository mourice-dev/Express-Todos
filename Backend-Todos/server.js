/** @format */

import express, { json } from "express";
import cors from "cors";
import { taskRoutes } from "./routes/taskRoute.js";
import { db } from "./config/db.js";

const app = express();
app.use(json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }));

app.get("/", (req, res) => {
  console.log(" server running on");
  res.json({ message: " server running on" });
});

app.use("/api/task/", taskRoutes);

app.listen(8000, () => {
  console.log("server running on Port 8000");
});
