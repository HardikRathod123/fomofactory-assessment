import mongoose from "mongoose";

const connection: { isConnected?: number } = {};
const MONGODB_URI = process.env.MONGODB_URI as string;

if (!MONGODB_URI) {
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

async function dbConnect() {
  if (connection.isConnected) return;
  try {
    const db = await mongoose.connect(MONGODB_URI);
    connection.isConnected = db.connections[0].readyState;
  } catch (error) {
    throw new Error("Error connecting to database");
  }
}

export default dbConnect;
