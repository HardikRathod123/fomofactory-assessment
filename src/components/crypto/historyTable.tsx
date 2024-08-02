"use client";
import { useEffect } from "react";
import { fetchCryptoDataByCode } from "../../../store/cryptoSlice";
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

const HistoryTable = () => {
  const dispatch = useAppDispatch();
  const cryptoStatus = useAppSelector((state) => state.cryptoReducer.status);
  const cryptoHistory = useAppSelector((state) => state.cryptoReducer.data);
  const selectedCrypto = useAppSelector(
    (state) => state.cryptoReducer.selectedCrypto
  );

  useEffect(() => {
    if (selectedCrypto) {
      const fetchInterval = setInterval(
        () => dispatch(fetchCryptoDataByCode(selectedCrypto)),
        10000
      );
      return () => clearInterval(fetchInterval);
    }
  }, [dispatch, selectedCrypto]);

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
            <TableHead className="py-2 px-4 text-left">
              Market Capital
            </TableHead>
            <TableHead className="py-2 px-4 text-left">Date</TableHead>
            <TableHead className="py-2 px-4 text-left">Price</TableHead>
            <TableHead className="py-2 px-4 text-right">Volume</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {cryptoHistory.map((history, index) => (
            <TableRow
              key={index}
              className="border-t border-gray-200 hover:bg-gray-50"
            >
              <TableCell className="py-2 px-4">{history.cap}$</TableCell>
              <TableCell className="py-2 px-4">
                {new Date(history.date).toLocaleString()}
              </TableCell>
              <TableCell className="py-2 px-4">{history.rate}$</TableCell>
              <TableCell className="py-2 px-4 text-right">
                {history.volume.toLocaleString()}
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

export default HistoryTable;
