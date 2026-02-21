"use client";

import { useState, useEffect } from "react";
import {
  Copy,
  Check,
  ArrowUpRight,
  Wallet,
  MoreHorizontal,
  ArrowRightLeft,
} from "lucide-react";
import { useRouter } from "next/navigation";
import ApiManager from "@/api/getWalletBalance";
import WalletDropdown from "@/components/walletDropdown";
import DisplayTokens from "@/components/displayTokens";

type Tab = "wallet" | "send" | "swap";

export interface Wallet {
  publicKey: string;
  privateKey: string;
  balance: number;
  usdPrice: number;
  index: number;
}

export interface TokenData {
  [mintId: string]: {
    amount: number;
    icon: string | null;
    name: string | null;
    symbol: string | null;
    usdPrice: number | null;
  };
}

export default function Page() {
  const router = useRouter();

  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const [walletData, setWalletData] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [tokens, setTokens] = useState<TokenData | null>(null);

  useEffect(() => {
    const walletData = localStorage.getItem("wallet-data");
    const selectedWallet = localStorage.getItem("selected-wallet");
    if (!walletData) {
      router.push("/import-or-generate-wallet");
    } else {
      setWalletData(JSON.parse(walletData));
      setSelectedWallet(JSON.parse(selectedWallet || walletData[0]));
    }
  }, []);

  useEffect(() => {
    const getAllTokensData = async () => {
      if (!selectedWallet) {
        console.log("Error");
        return;
      }

      const tokensData: TokenData = {};
      const mintIds: string[] = [];
      const tokenDataResponse = await ApiManager.getAllTokensOfWallet(
        selectedWallet?.publicKey,
      );
      const allTokenData = tokenDataResponse?.data?.result?.value;
      if (allTokenData?.length === 0) return;

      allTokenData?.data?.result?.value.forEach((data: any) => {
        const tokenInfo = data.account.data.parsed.info;
        const mintId = tokenInfo.mint;
        const amount = tokenInfo.tokenAmount.uiAmount;
        if (amount > 0) {
          tokensData[mintId] = {
            amount,
            icon: null,
            name: null,
            symbol: null,
            usdPrice: null,
          };

          mintIds.push(mintId);
        }
      });

      const res = await ApiManager.getTokenDetails(mintIds.join(","));
      const responseData = res.data;
      responseData.forEach((data) => {
        tokensData[data.id] = {
          ...tokensData[data.id],
          icon: data.icon,
          name: data.name,
          symbol: data.symbol,
          usdPrice: data.usdPrice,
        };
      });

      setTokens(tokensData);
    };

    getAllTokensData();
  }, [selectedWallet]);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedWallet?.publicKey || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      {/* Header */}
      <header className="relative flex items-center justify-between px-4 py-3 border-b border-[#27272a]">
        <WalletDropdown
          router={router}
          walletData={walletData}
          selectedWallet={selectedWallet}
          setSelectedWallet={setSelectedWallet}
          isOpen={isWalletDropdownOpen}
          setIsOpen={setIsWalletDropdownOpen}
        />

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyAddress}
            className="p-2 rounded-lg hover:bg-[#18181b] transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-[#71717a]" />
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-[#18181b] transition-colors">
            <MoreHorizontal className="w-4 h-4 text-[#71717a]" />
          </button>
        </div>
      </header>

      {/* Balance Section */}
      <div
        className="px-4 py-6 text-center overflow-y-auto pb-4"
        style={{ height: "calc(100% - 4rem)" }}
      >
        <div className="text-sm text-[#71717a] mb-2">Total Balance</div>
        {selectedWallet && (
          <div className="flex flex-col ">
            <span className="text-4xl font-bold tracking-tight">
              ${" "}
              {(selectedWallet?.balance * selectedWallet?.usdPrice).toFixed(2)}
            </span>
            <span className="font-medium">
              {selectedWallet?.balance.toFixed(2)} Sol
            </span>
          </div>
        )}

        <DisplayTokens tokens={tokens} />
      </div>

      {/* Footer */}
      <footer className="absolute bottom-0 w-full flex items-center justify-around px-4 py-3 border-t border-[#27272a] bg-[#09090b]">
        <button
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-white cursor-pointer"
          onClick={() => router.push("/send")}
        >
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-medium">Wallet</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer"
          onClick={() => router.push("/send")}
        >
          <ArrowUpRight className="w-5 h-5" />
          <span className="text-[10px] font-medium">Send</span>
        </button>
        <button
          className="flex flex-col items-center gap-1 p-2 rounded-lg text-[#71717a] hover:text-[#a1a1aa] transition-colors cursor-pointer"
          onClick={() => router.push("/swap")}
        >
          <ArrowRightLeft className="w-5 h-5" />
          <span className="text-[10px] font-medium">Swap</span>
        </button>
      </footer>

      {/* Click outside to close dropdown */}
      {isWalletDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsWalletDropdownOpen(false)}
        />
      )}
    </>
  );
}
