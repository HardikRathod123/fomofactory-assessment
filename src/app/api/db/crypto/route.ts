// pages/api/crypto.ts
import type { NextApiRequest, NextApiResponse } from "next";
import mongoose from "mongoose";
import Crypto from "@/lib/mongo/models/Crypto";
import { NextResponse } from "next/server";

export default async function GET(req: Request, res: Response) {
  try {
    // Connect to your MongoDB database
    if (!mongoose.connection.readyState) {
      await mongoose.connect(process.env.MONGODB_URI as string);
    }

    // Fetch the most recent 20 entries
    const cryptoData = await Crypto.find().sort({ createdAt: -1 }).limit(20);

    return Response.json(cryptoData);
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}
