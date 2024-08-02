import dbConnect from "@/lib/mongo/dbConnect";
import Crypto, { ICrypto } from "@/lib/mongo/models/Crypto";
import axios from "axios";
import { NextApiRequest } from "next";
import { NextResponse } from "next/server";
const COIN_WATCH_URL = process.env.COIN_WATCH_URL as string;
const API_KEY = process.env.COIN_WATCH_API_KEY as string;

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const offset = parseInt(searchParams.get("offset") || "0");
    const limit = parseInt(searchParams.get("limit") || "5");
    await dbConnect();
    const coinData = await axios.post(
      COIN_WATCH_URL + "/coins/list",
      {
        currency: "USD",
        sort: "rank",
        order: "ascending",
        offset: offset,
        limit: limit,
        meta: true,
      },
      {
        headers: {
          "content-type": "application/json",
          "x-api-key": API_KEY,
        },
      }
    );

    const coins: ICrypto[] = coinData.data.map((coin: any) => {
      return {
        code: coin.code,
        symbol: coin?.symbol || "N/A",
        rate: coin.rate,
        cap: coin.cap,
        volume: coin.volume,
      };
    });

    for (const coin of coins) {
      const filter = { code: coin.code };
      await Crypto.findOneAndUpdate(filter, coin, { upsert: true });
    }

    return Response.json(coins);
  } catch (error: any) {
    return Response.json({ error: error?.message });
  }
}
