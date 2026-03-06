"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Clipboard, Key } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Keypair } from "@solana/web3.js";
import bs58 from "bs58";
import ApiManager from "@/api";

export default function ImportPrivateKey() {
  const router = useRouter();

  const [privateKey, setPrivateKey] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const onPasteBtnClick = async () => {
    const text = await navigator.clipboard.readText();
    setPrivateKey(text.trim());
    setError("");
  };

  const importWalletFromPrivateKey = async () => {
    setError("");
    setIsLoading(true);
    try {
      const secretKey = bs58.decode(privateKey.trim());
      const keypair = Keypair.fromSecretKey(secretKey);
      const publicKey = keypair.publicKey.toBase58();

      const prevWalletData = JSON.parse(
        localStorage.getItem("wallet-data") || "[]",
      );

      const balance = (await ApiManager.getWalletBalance(publicKey)) || 0;
      const usdPrice = await ApiManager.getSolPriceUSD();

      const newWallet = {
        publicKey,
        privateKey: privateKey.trim(),
        balance,
        usdPrice,
        index: prevWalletData.length + 1,
      };

      const newData = [...prevWalletData, newWallet];
      localStorage.setItem("wallet-data", JSON.stringify(newData));
      localStorage.setItem("selected-wallet", JSON.stringify(newWallet));

      router.push("/home");
    } catch {
      setError("Invalid private key. Please check and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="text-center text-gray-400">Import with Private Key</span>

      <div className="w-full font-medium">
        <Button
          className="bg-blue-500/20 text-blue-500 cursor-pointer hover:bg-blue-500/10"
          onClick={onPasteBtnClick}
        >
          <Clipboard />
          Paste
        </Button>
      </div>

      <div className="flex flex-col gap-1">
        <div className="relative">
          <Key className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 size-4" />
          <Input
            className="outline-0 border border-neutral-800 pl-9 font-mono text-sm"
            value={privateKey}
            placeholder="Enter your Base58 private key..."
            onChange={(e) => {
              setPrivateKey(e.target.value);
              setError("");
            }}
          />
        </div>
        {error && <span className="text-red-500 text-xs mt-1">{error}</span>}
      </div>

      <Button
        className="cursor-pointer hover:bg-neutral-800"
        disabled={!privateKey.trim() || isLoading}
        onClick={importWalletFromPrivateKey}
      >
        <Key />
        {isLoading ? "Importing..." : "Import"}
      </Button>
    </div>
  );
}
