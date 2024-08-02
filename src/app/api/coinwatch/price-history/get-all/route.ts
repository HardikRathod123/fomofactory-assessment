import dbConnect from "@/lib/mongo/dbConnect";
import CryptoHistory from "@/lib/mongo/models/Crypto-history";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const code = searchParams.get("code");

  try {
    await dbConnect();
    const history = await CryptoHistory.find({ code });
    if (history.length > 0) return Response.json(history[0]);
    return Response.json({ error: "No history found" });
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}
