import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const response = await mongoose.connect(process.env.MONGODB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
        console.log("MongoDB is Connected to Server !")
  } catch (error) {
    console.log(error);
  }
};

