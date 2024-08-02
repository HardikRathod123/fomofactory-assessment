"use client";
import CryptoTable from "@/components/crypto/cryptoTable";
import { Button } from "@/components/ui/button";
import { ICrypto } from "@/lib/mongo/models/Crypto";
import axios from "axios";
import { set } from "mongoose";
import { useCallback, useEffect, useState } from "react";
import StoreProvider from "./StoreProvider";
import RootLayout from "./layout";
const COIN_WATCH_URL = process.env.NEXT_PUBLIC_COIN_WATCH_URL as string;
const API_KEY = process.env.NEXT_PUBLIC_COIN_WATCH_API_KEY as string;

export default function Home() {
  const [coins, setCoins] = useState([]);
  const [offset, setOffset] = useState(0);
  const limit = 5;
  const intervalToFetch = 10000;

  const fetchCoinsHistory = async (offset: number = 0) => {
    const response = await axios.get(`/api/coinwatch/price-history`);
    return response.data;
  };

  useEffect(() => {
    const intervalId = setInterval(fetchCoinsHistory, intervalToFetch);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <RootLayout>
      <StoreProvider>
        <div>
          <h1>Real-Time Stock/Crypto Tracker</h1>
          <CryptoTable />
        </div>
      </StoreProvider>
    </RootLayout>
  );
}
