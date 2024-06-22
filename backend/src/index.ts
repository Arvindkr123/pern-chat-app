import express, { urlencoded } from "express";
import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
app.use(urlencoded({ extended: true }));
app.use(express.json()); // for parse the application/json data
app.use(cookieParser()); // for parse cookie

app.use("/api/auth", authRoutes);
app.use("/api/message", messageRoutes);

app.listen(4000, () => {
  console.log("server listening on port 4000");
});
