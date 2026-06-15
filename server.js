import express from "express";
import dotenv from "dotenv";
import cors from "cors";

import usersRouter from "./routes/users.js";
import itemsRouter from "./routes/items.js";
import requestsRouter from "./routes/requests.js";

dotenv.config();

const app = express();

const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/uploads", express.static("uploads"));

app.get("/", (req, res) => {
  res.send("BorrowHub API is running...");
});

app.use("/users", usersRouter);
app.use("/items", itemsRouter);
app.use("/requests", requestsRouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});