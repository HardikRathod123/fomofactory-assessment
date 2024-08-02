import Crypto from "@/lib/mongo/models/Crypto";
import dbConnect from "@/lib/mongo/dbConnect";

export async function GET(req: Request, res: Response) {
  try {
    await dbConnect();
    // Fetch the most recent 20 entries
    const cryptoData = await Crypto.find().sort({ createdAt: -1 }).limit(20);

    return Response.json(cryptoData);
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}
