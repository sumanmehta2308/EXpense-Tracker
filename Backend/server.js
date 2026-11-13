import dotenv from "dotenv";
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import db from "./config/database.js";
import expenseRoute from "./routes/expenseRoute.js";
dotenv.config();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const app = express();
app.use(express.json());
app.use(express.static(path.join(__dirname, "../frontend")));
app.use("/expenses", expenseRoute);
app.get("/health", (req, res) => {
  res.status(200).json({ message: "Expense Tracker API is running" });
});
const PORT = process.env.PORT || 3000;
db.query("SELECT 1")
  .then(() => {
    console.log("MySQL connected successfully");
    app.listen(PORT, () => {
      console.log(`Server running at http://localhost:${PORT}`);
    });
  })
  .catch((error) => {
    console.error("MySQL connection failed:", error.message);
  });
