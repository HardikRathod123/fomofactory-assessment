import mongoose, { Document, Schema } from "mongoose";

type history = {
  date: Date;
  rate: number;
  volume: number;
  cap: number;
};

export interface coinHistory extends Document {
  code: string;
  history: history[];
}

const coinHistorySchema: Schema = new mongoose.Schema({
  code: { type: String, required: true },
  history: [
    {
      date: { type: Date, required: true },
      rate: { type: Number, required: true },
      volume: { type: Number, required: true },
      cap: { type: Number, required: true },
    },
  ],
});

const CryptoHistory =
  mongoose.models.CryptoHistory ||
  mongoose.model<coinHistory>("CryptoHistory", coinHistorySchema);

export default CryptoHistory;
