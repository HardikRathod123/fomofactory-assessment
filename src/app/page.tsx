"use client";
import React, { useEffect } from "react";
import CryptoTable from "@/components/crypto/cryptoTable";
import StoreProvider from "./StoreProvider";
import RootLayout from "./layout";
import CryptoSelector from "@/components/crypto/cryptoSelector";
import axios from "axios";
import HistoryTable from "@/components/crypto/historyTable";

const COIN_WATCH_URL = process.env.COIN_WATCH_URL as string;
const API_KEY = process.env.COIN_WATCH_API_KEY as string;

export default function Home() {
  const intervalToFetch = 10000;

  const fetchCoinsHistory = async () => {
    try {
      const response = await axios.get(`/api/coinwatch/price-history/update`);
      return response.data;
    } catch (error) {
      console.error("Error fetching coin history:", error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchCoinsHistory, intervalToFetch);
    return () => clearInterval(intervalId);
  }, []);

  return (
    <RootLayout>
      <StoreProvider>
        <div className="max-w-4xl mx-auto py-8">
          <h1 className="text-2xl font-bold text-center mb-6">
            Real-Time Stock/Crypto Tracker
          </h1>
          <CryptoSelector />
          <HistoryTable />
        </div>
      </StoreProvider>
    </RootLayout>
  );
}
