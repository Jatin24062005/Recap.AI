import express from "express";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import meetingRoutes from "./Routes/meetingRoutes.js";
import userRoutes from "./Routes/userRoutes.js"; // Import user routes
import cors from "cors"; // Import CORS middleware
const app = express();

dotenv.config();
connectDB();

app.use(express.json()); // ✅ This enables parsing JSON bodies
const corsOptions = {
  origin: ["http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH"],
  allowedHeaders: ["Content-Type", "Authorization"],
  exposedHeaders: ["Content-Type", "Authorization"],
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.send("Hello Gagan Sir!");
});

app.use("/meeting", meetingRoutes); // ✅ All /meeting routes handled here
app.use("/user", userRoutes); // ✅ All /user routes handled here

app.listen(process.env.PORT || 8000, () => {
  console.log(`Server is Running At Port ${process.env.PORT || 8000}`);
});
