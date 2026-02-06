import { Wallet } from "@/app/home/page";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { ChevronDown, Plus } from "lucide-react";
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

interface WalletDropdownProps {
  router: AppRouterInstance;
  walletData: Wallet[];
  selectedWallet: Wallet | null;
  setSelectedWallet: React.Dispatch<React.SetStateAction<Wallet | null>>;
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export default function WalletDropdown({
  router,
  walletData,
  selectedWallet,
  setSelectedWallet,
  isOpen,
  setIsOpen,
}: WalletDropdownProps) {
  const handleSelectWallet = (wallet: Wallet) => {
    setSelectedWallet(wallet);
    setIsOpen(false);
  };
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between px-2 py-2 w-40 rounded-lg hover:bg-[#18181b] transition-colors cursor-pointer"
        >
          <div className="flex  items-center gap-2">
            <div className="w-7 h-7 rounded-full bg-linear-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
              W{selectedWallet?.index}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">Wallet {selectedWallet?.index}</span>
              <span className="text-[10px] text-[#71717a] truncate overflow-hidden w-20">
                {selectedWallet?.publicKey}
              </span>
            </div>
          </div>
          <ChevronDown
            className={`w-4 h-4 text-[#71717a] transition-transform ${isOpen ? "rotate-180" : ""}`}
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
                  <span className="text-sm font-medium">Wallet {i + 1}</span>
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
  );
}
