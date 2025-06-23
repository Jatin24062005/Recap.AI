import express from 'express';
import dotenv from 'dotenv';
import { connectDB } from './config/db.js';
import meetingRoutes from './Routes/meetingRoutes.js';

const app = express();

dotenv.config(); 
connectDB();

app.use(express.json()); // ✅ This enables parsing JSON bodies

app.get('/', (req, res) => {
    res.send("Hello Gagan Sir!");
});

app.use('/meeting', meetingRoutes); // ✅ All /meeting routes handled here

app.listen(process.env.PORT || 8000, () => {
    console.log(`Server is Running At Port ${process.env.PORT || 8000}`);
});
