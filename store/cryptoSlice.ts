// store/cryptoSlice.ts
import { ICrypto } from "@/lib/mongo/models/Crypto";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export interface CryptoDataState {
  data: ICrypto[];
  status: "idle" | "loading" | "succeeded" | "failed";
  error: string | null | undefined;
  selectedCrypto: ICrypto | null;
}

const initialState: CryptoDataState = {
  data: [],
  status: "idle",
  error: null,
  selectedCrypto: null,
};

// Define async thunk to fetch data from API
export const fetchCryptoData = createAsyncThunk(
  "crypto/fetchCryptoData",
  async () => {
    const response = await axios.get(`/api/db/crypto`);
    return response.data;
  }
);

export const fetchCryptoDataByCode = createAsyncThunk(
  "crypto/fetchCryptoDataByCode",
  async (code: string) => {
    const response = await axios.get(`/api/db/crypto/get-by-code?code=${code}`);
    return response.data;
  }
);

const cryptoSlice = createSlice({
  name: "crypto",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      //Reducers for fetchCryptoData
      .addCase(fetchCryptoData.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoData.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.data = action.payload;
      })
      .addCase(fetchCryptoData.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      //Reducers for fetchCryptoDataByCode
      .addCase(fetchCryptoDataByCode.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCryptoDataByCode.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.selectedCrypto = action.payload;
      })
      .addCase(fetchCryptoDataByCode.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default cryptoSlice.reducer;
