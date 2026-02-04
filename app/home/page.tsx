"use client";

import { useState, useEffect } from "react";
import {
  ChevronDown,
  Copy,
  Check,
  ArrowUpRight,
  Wallet,
  MoreHorizontal,
  Plus,
  ArrowRightLeft,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useRouter } from "next/navigation";

type Tab = "wallet" | "send" | "swap";

interface Wallet {
  publicKey: string;
  privateKey: string;
  balance: number;
}

export default function Page() {
  const router = useRouter();

  const [walletData, setWalletData] = useState<Wallet[]>([]);
  const [selectedWallet, setSelectedWallet] = useState<Wallet | null>(null);
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const walletData = localStorage.getItem("wallet-data");
    if (!walletData) {
      router.push("/import-or-generate-wallet");
    } else {
      setWalletData(JSON.parse(walletData || "[]"));
      setSelectedWallet(JSON.parse(walletData || "[]")[0]);
    }
  }, []);

  const handleCopyAddress = () => {
    navigator.clipboard.writeText(selectedWallet?.publicKey || "");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSelectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setIsWalletDropdownOpen(false);
  };

  return (
    <>
      {/* Header with Wallet Selector */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#27272a]">
        {/* Wallet Dropdown */}
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
              className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#18181b] transition-colors"
            >
              <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                W1
              </div>
              <div className="flex flex-col items-start">
                <span className="text-sm font-medium">Wallet 1</span>
                <span className="text-[10px] text-[#71717a] truncate overflow-hidden w-12">
                  {selectedWallet?.publicKey}
                </span>
              </div>
              <ChevronDown
                className={`w-4 h-4 text-[#71717a] transition-transform ${isWalletDropdownOpen ? "rotate-180" : ""}`}
              />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-60 bg-neutral-900" align="start">
            <DropdownMenuGroup className="flex flex-col gap-1">
              {walletData?.map((wallet, i) => (
                <Button
                  key={wallet.publicKey}
                  onClick={() => handleSelectWallet(wallet)}
                  className={`w-full justify-between flex gap-3 px-2 py-6 rounded-md transition-colors cursor-pointer ${
                    selectedWallet?.publicKey === wallet?.publicKey
                      ? "bg-neutral-800 hover:bg-neutral-800"
                      : "hover:bg-neutral-800/50"
                  }`}
                >
                  <div className="flex gap-4">
                    <div className="w-8 h-8 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                      W{i + 1}
                    </div>
                    <div className="flex flex-col items-start">
                      <span className="text-sm font-medium">
                        Wallet {i + 1}
                      </span>
                      <span className="text-[10px] text-[#71717a] truncate overflow-hidden w-28">
                        {wallet?.publicKey}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-[#a1a1aa]">
                    {wallet?.balance} sol
                  </div>
                </Button>
              ))}
            </DropdownMenuGroup>
            <DropdownMenuSeparator className="bg-neutral-700" />
            <Button
              className="w-full bg-neutral-800 cursor-pointer"
              onClick={() => router.push("import-or-generate-wallet")}
            >
              <Plus className="w-4 h-4" />
              Add Wallet
            </Button>
          </DropdownMenuContent>
        </DropdownMenu>

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
      <div className="px-4 py-6 text-center h-full">
        <div className="text-4xl font-bold tracking-tight">
          {/* {selectedWallet?.balance} */}
          {selectedWallet?.balance} Sol
        </div>
        <div className="text-sm text-[#71717a] mt-1">Total Balance</div>

        {/* Action Buttons */}
      {/*   <div className="flex items-center justify-center gap-3 mt-5"> */}
      {/*     <button className="flex flex-col items-center gap-1.5"> */}
      {/*       <div className="w-12 h-12 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:bg-[#27272a] transition-colors"> */}
      {/*         <ArrowUpRight className="w-5 h-5" /> */}
      {/*       </div> */}
      {/*       <span className="text-xs text-[#a1a1aa]">Send</span> */}
      {/*     </button> */}
      {/*     <button className="flex flex-col items-center gap-1.5"> */}
      {/*       <div className="w-12 h-12 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:bg-[#27272a] transition-colors"> */}
      {/*         <ArrowDownLeft className="w-5 h-5" /> */}
      {/*       </div> */}
      {/*       <span className="text-xs text-[#a1a1aa]">Receive</span> */}
      {/*     </button> */}
      {/*   </div> */}
      {/* </div> */}
      </div>

      {/* Footer Navigation */}
      <footer className="flex items-center justify-around px-4 py-3 border-t border-[#27272a] bg-[#09090b]">
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-white">
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-medium">Wallet</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-[#71717a] hover:text-[#a1a1aa] transition-colors">
          <ArrowUpRight className="w-5 h-5" />
          <span className="text-[10px] font-medium">Send</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-[#71717a] hover:text-[#a1a1aa] transition-colors">
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
