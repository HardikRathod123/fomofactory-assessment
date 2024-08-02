import mongoose, { Document, Schema } from "mongoose";

export interface ICrypto extends Document {
  code: string;
  symbol: string;
  rate: number;
  cap: number;
  volume: number;
}

const cryptoSchema: Schema = new mongoose.Schema({
  code: { type: String, required: true },
  symbol: { type: String, required: true },
  rate: { type: Number, required: true },
  cap: { type: Number, required: true },
  volume: { type: Number, required: true },
});

const Crypto =
  mongoose.models.Crypto || mongoose.model<ICrypto>("Crypto", cryptoSchema);

export default Crypto;
