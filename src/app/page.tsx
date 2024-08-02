"use client";
import { ICrypto } from "@/lib/utils/mongo/models/Crypto";
import axios from "axios";
import { useEffect, useState } from "react";
const COIN_WATCH_URL = process.env.NEXT_PUBLIC_COIN_WATCH_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_COIN_WATCH_API_KEY as string;

export default function Home() {
  const fetchCoins = async () => {
    const response = await axios.get("/api/coinwatch");

    return response.data;
  };
  const [coins, setCoins] = useState([]);
  useEffect(() => {
    fetchCoins().then((data) => setCoins(data));
    const intervalId = setInterval(fetchCoins, 10000); // Fetch every 10 seconds

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <h1>Real-Time Stock/Crypto Tracker</h1>
      <table>
        <thead>
          <tr>
            <th>Code</th>
            <th>Symbol</th>
            <th>Rate</th>
            <th>Cap</th>
            <th>Volume</th>
          </tr>
        </thead>
        <tbody>
          {coins.map((coin: ICrypto) => (
            <tr key={coin.code}>
              <td>{coin.code}</td>
              <td>{coin.symbol}</td>
              <td>{coin.rate}</td>
              <td>{coin.cap}</td>
              <td>{coin.volume}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
