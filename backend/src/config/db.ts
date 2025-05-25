import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log("Database connected");
  } catch (error: any) {
    console.log(error.message);
    process.exit(1);
  }
};

export default connectDB;
