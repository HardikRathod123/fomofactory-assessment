"use client";
import { useEffect } from "react";
// import { fetchCryptoData } from "../../../store/cryptoSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  Table,
  TableCaption,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
  TableFooter,
} from "../ui/table";

const CryptoTable = () => {
  const dispatch = useAppDispatch();
  const cryptoStatus = useAppSelector((state) => state.cryptoReducer.status);
  const cryptoData = useAppSelector((state) => state.cryptoReducer.data);

  useEffect(() => {
    if (cryptoStatus === "idle") {
      // dispatch(fetchCryptoData());
    }
  }, [dispatch, cryptoStatus]);

  if (cryptoStatus === "loading") {
    return <div className="text-center py-4">Loading...</div>;
  }

  return (
    <div className="p-4">
      <Table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-md">
        <TableCaption className="text-lg font-semibold text-gray-700">
          Recent Crypto Data
        </TableCaption>
        <TableHeader className="bg-gray-100">
          <TableRow>
            <TableHead className="py-2 px-4 text-left">Code</TableHead>
            <TableHead className="py-2 px-4 text-left">Rate</TableHead>
            <TableHead className="py-2 px-4 text-left">Symbol</TableHead>
            <TableHead className="py-2 px-4 text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptoData.map((crypto) => (
            <TableRow
              key={crypto.code}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <TableCell className="py-2 px-4">{crypto.code}</TableCell>
              <TableCell className="py-2 px-4">
                {crypto.rate.toFixed(2)}
              </TableCell>
              <TableCell className="py-2 px-4">{crypto.symbol}</TableCell>
              <TableCell className="py-2 px-4 text-right">
                {crypto.volume.toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter className="bg-gray-100">
          {/* //   ?   Pagination */}
        </TableFooter>
      </Table>
    </div>
  );
};

export default CryptoTable;
