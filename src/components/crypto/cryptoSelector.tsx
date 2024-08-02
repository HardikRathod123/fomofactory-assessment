import React, { useEffect } from "react";
import { SelectContent, SelectGroup } from "@radix-ui/react-select";
import { cryptoList } from "../../../constant";
import {
  fetchCryptoDataByCode,
  setSelectedCrypto,
} from "../../../store/cryptoSlice";
import { useAppDispatch, useAppSelector } from "../../../store/store";
import {
  Select,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const CryptoSelector = () => {
  const dispatch = useAppDispatch();
  const selectedCrypto = useAppSelector(
    (state) => state.cryptoReducer.selectedCrypto
  );

  const handleSelectChange = (value: string) => {
    dispatch(setSelectedCrypto(value));
  };

  useEffect(() => {
    if (selectedCrypto) {
      dispatch(fetchCryptoDataByCode(selectedCrypto));
    }
  }, [selectedCrypto, dispatch]);

  return (
    <div className="flex justify-center mb-4">
      <Select
        value={selectedCrypto || undefined}
        onValueChange={handleSelectChange}
      >
        <SelectTrigger className="w-[180px] border border-gray-300 rounded-lg shadow-sm p-2 bg-white focus:outline-none focus:ring-2 focus:ring-blue-500">
          <SelectValue placeholder="Select a Crypto" />
        </SelectTrigger>
        <SelectContent className="bg-white border border-gray-300 rounded-lg shadow-lg z-10">
          <SelectGroup>
            {cryptoList.map((crypto) => (
              <SelectItem
                key={crypto}
                value={crypto}
                className="hover:bg-blue-100 px-4 py-2 cursor-pointer"
              >
                {crypto}
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
};

export default CryptoSelector;
