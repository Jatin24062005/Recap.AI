import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    
    const response = await mongoose.connect(process.env.MONGODB_URL);
    // Using Mongoose
        console.log("MongoDB is Connected to Server !")
  } catch (error) {
    console.log(error);
  }
};

