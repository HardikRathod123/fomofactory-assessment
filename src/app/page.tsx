"use client";
import { ICrypto } from "@/lib/utils/mongo/models/Crypto";
import axios from "axios";
import { set } from "mongoose";
import { useCallback, useEffect, useState } from "react";
const COIN_WATCH_URL = process.env.NEXT_PUBLIC_COIN_WATCH_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_COIN_WATCH_API_KEY as string;

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;

  const fetchCoins = async (offset: number = 0) => {
    const response = await axios.get(
      `/api/coinwatch?offset=${offset}&limit=${limit}`
    );
    return response.data;
  };

  useEffect(() => {
    fetchCoins(offset).then((data) => setCoins(data));
  }, [offset]);

  useEffect(() => {
    const intervalId = setInterval(() => {
      setOffset((prevOffset) => prevOffset + limit); // Increase offset by limit
    }, 10000);
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
          {coins &&
            coins.length > 0 &&
            coins.map((coin: ICrypto) => (
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
