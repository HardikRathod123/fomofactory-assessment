// store/cryptoSlice.ts
import { ICrypto } from "@/lib/mongo/models/Crypto";
import {
  createSlice,
  createAsyncThunk,
  PayloadAction,
  Dispatch,
} from "@reduxjs/toolkit";
import axios from "axios";
import { cryptoList } from "../constant";
import { useAppSelector } from "./store";

type history = {
  date: Date;
  rate: number;
  volume: number;
  cap: number;
};

export interface CryptoDataState {
  data: history[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  selectedCrypto: string;
}

const initialState: CryptoDataState = {
  data: [],
  status: "idle",
  error: null,
  selectedCrypto: cryptoList[0],
};

export const fetchCryptoDataByCode = createAsyncThunk(
  "crypto/fetchCryptoDataByCode",
  async (selectedCrypto: string) => {
    const response = await axios.get(
      `/api/coinwatch/price-history/get-all?code=${selectedCrypto}`
    );
    return response.data.history;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {
    setSelectedCrypto: (state, action) => {
      state.selectedCrypto = action.payload;
      fetchCryptoDataByCode(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      //Reducers for fetchCryptoDataByCode
      .addCase(fetchCryptoDataByCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoDataByCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCryptoDataByCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setSelectedCrypto } = cryptoSlice.actions;

export default cryptoSlice.reducer;
