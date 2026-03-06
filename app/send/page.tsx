"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useEffect, useEffectEvent, useState } from "react";
import { Wallet } from "../home/page";
import { useRouter } from "next/navigation";
import { AddressInput } from "./addressInput";
import ApiManager from "@/api";
import { cn } from "@/lib/utils";
import SolanaIcon from "./solIcon";

export default function Page() {
  const router = useRouter();

  const [isNextBtnClicked, setIsNextBtnClicked] = useState(false);
  const [address, setAddress] = useState("");
  const [isValid, setIsValid] = useState<boolean | null>(null);
  const [amount, setAmount] = useState<string>("");
  const [walletData, setWalletData] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [balance, setBalance] = useState(0);
  const [solPriceUSD, setSolPriceUSD] = useState(0);

  useEffect(() => {
    const walletData = localStorage.getItem("wallet-data");
    const selectedWallet = localStorage.getItem("selected-wallet");
    if (!walletData) {
      router.push("/import-or-generate-wallet");
    } else {
      setWalletData(JSON.parse(walletData));
      setSelectedWallet(JSON.parse(selectedWallet || walletData[0]));
    }

    const getSolPriceUSD = async () => {
      const price = await ApiManager.getSolPriceUSD();
      setSolPriceUSD(price);
    };

    getSolPriceUSD();
  }, []);

  useEffect(() => {
    if (address === "") {
      setIsValid(null);
      return;
    }
    const isValidAddress = ApiManager.validatePublicKey(address);
    setIsValid(isValidAddress);
  }, [address]);

  useEffect(() => {
    if (!selectedWallet) return;
    const fetchBalance = async () => {
      const balance = await ApiManager.getWalletBalance(
        selectedWallet?.publicKey,
      );
      if (balance) {
        setBalance(balance);
      }
    };

    fetchBalance();
  }, [selectedWallet]);

  const onBackButtonClick = () => {
    if (isNextBtnClicked) {
      setIsNextBtnClicked(false);
    } else {
      history.back();
    }
  };

  const sendSolana = () => {
    const from = selectedWallet;

    ApiManager.send(
      from?.publicKey || "",
      from?.privateKey || "",
      address,
      Number(amount),
    );
  };

  return (
    <div className="px-4 relative h-full">
      <ArrowLeft
        className="absolute w-8 mt-4 text-neutral-500 cursor-pointer"
        onClick={onBackButtonClick}
      />
      <div className="font-medium mt-4 text-xl text-white text-center">
        Send
      </div>
      <div className="mt-4">
        <AddressInput
          wallets={walletData.filter((data) => {
            data.publicKey !== selectedWallet?.publicKey;
          })}
          value={address}
          isValid={isValid}
          onChange={setAddress}
        />
      </div>
      <div
        className="w-full flex flex-col items-center justify-center text-center"
        style={{ height: "calc(100% - 11rem)" }}
      >
        <div className="flex gap-2 items-center">
          <SolanaIcon />
          <div className="text-gray-500 font-medium">SOL</div>
        </div>
        <input
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className={cn(
            "border-none text-center  bg-transparent outline-0 ring-0 text-5xl font-semibold w-[1ch] [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none",
          )}
          style={{ width: `${(amount || "0").length}ch` }}
          type="number"
          min="0"
          placeholder="0"
        />
        <div className="text-gray-500 font-medium">
          $ {solPriceUSD * Number(amount)}
        </div>
        <span className="text-gray-500 font-medium">Max: {balance} SOL</span>
      </div>
      <Button
        disabled={
          !address.trim() ||
          !isValid ||
          !(!!amount && Number(amount) > 0 && Number(amount) < balance)
        }
        className="w-full bg-white text-black text-md font-semibold absolute bottom-4 cursor-pointer"
        style={{ width: "calc(100% - 2rem)" }}
        onClick={sendSolana}
      >
        Next
      </Button>
    </div>
  );
}
