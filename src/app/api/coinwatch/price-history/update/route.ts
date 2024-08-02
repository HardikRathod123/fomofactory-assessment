import dbConnect from "@/lib/mongo/dbConnect";
import Crypto, { ICrypto } from "@/lib/mongo/models/Crypto";
import CryptoHistory from "@/lib/mongo/models/Crypto-history";
import axios from "axios";
import { cryptoList } from "../../../../../../constant";

const COIN_WATCH_URL = process.env.COIN_WATCH_URL as string;
const API_KEY = process.env.COIN_WATCH_API_KEY as string;

async function fetchCoinHistory(code: string) {
  const coinHistory = await axios.post(
    COIN_WATCH_URL + "/coins/single/history",
    {
      currency: "USD",
      code: code,
      start: Date.now() - 60 * 60 * 1000, // Last minute
      end: Date.now(),
    },
    {
      headers: {
        "content-type": "application/json",
        "x-api-key": API_KEY,
      },
    }
  );

  return coinHistory.data;
}

export async function GET() {
  let coinData;
  await dbConnect();
  try {
    const updatePromises = cryptoList.map(async (code) => {
      try {
        const filter = { code };
        const data = await fetchCoinHistory(code);
        const newCoin = {
          code,
          history: data.history,
        };
        await CryptoHistory.findOneAndUpdate(filter, newCoin, {
          upsert: true,
        });
      } catch (error) {
        console.error(`Error fetching data for ${code}:`, error);
      }
    });

    // Wait for all updates to complete
    await Promise.all(updatePromises);

    return Response.json({ message: "Crypto prices updated" });
  } catch (error: any) {
    console.error("Error updating crypto prices:", error);
    return Response.json({ error: error?.message });
  }
}
