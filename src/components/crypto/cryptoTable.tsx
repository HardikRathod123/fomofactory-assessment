"use client";
import { useEffect } from "react";
import { fetchCryptoData } from "../../../store/cryptoSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const cryptoStatus = useAppSelector((state) => state.cryptoReducer.status);
  useEffect(() => {
    if (cryptoStatus == "idle") {
      dispatch(fetchCryptoData());
    }
  });
  const cryptoData = useAppSelector((state) => state.cryptoReducer.data);
  console.log("crypto data", cryptoData);
  return (
    <div>
      <h1>Crypto Table</h1>
    </div>
  );
};

export default CryptoTable;
