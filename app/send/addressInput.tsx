"use client";

import { useState, useRef, useEffect } from "react";
import { Input } from "@/components/ui/input";
import { ChevronDown, OctagonAlert } from "lucide-react";
import { Wallet } from "@/app/home/page";
import { cn } from "@/lib/utils";
import SolanaIcon from "./solIcon";

interface AddressInputProps {
  wallets: Wallet[];
  value: string;
  onChange: (value: string) => void;
  isValid: boolean | null;
}

export function AddressInput({
  wallets,
  value,
  onChange,
  isValid,
}: AddressInputProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (publicKey: string) => {
    onChange(publicKey);
    setOpen(false);
  };

  return (
    <div ref={containerRef} className="relative mb-3">
      {/* Input with dropdown toggle */}
      <div className="relative flex items-center">
        <Input
          className={cn(
            "border bg-neutral-900 pr-9 text-white placeholder:text-neutral-500",
            isValid === false ? "border-red-500/50" : "border-neutral-800 ",
          )}
          placeholder="Enter address or select wallet"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
        />
        <button
          type="button"
          onClick={() => setOpen((prev) => !prev)}
          className="absolute right-2 text-neutral-400 hover:text-white transition-colors"
          aria-label="Toggle wallet dropdown"
        >
          <ChevronDown
            className={`w-4 h-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`}
          />
        </button>
      </div>
      {isValid === false && (
        <span className="flex gap-2 text-sm items-center text-red-500/80 font-medium m-2">
          <OctagonAlert size={15} />
          Invalid address
        </span>
      )}

      {/* Dropdown panel */}
      {open && wallets.length > 0 && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-neutral-800 bg-neutral-950 shadow-lg overflow-hidden">
          <p className="px-3 pt-2 pb-1 text-xs font-medium text-neutral-500 uppercase tracking-wider">
            Your addresses
          </p>
          <div className="max-h-56 overflow-y-auto">
            {wallets.map((wallet) => (
              <button
                key={wallet.publicKey}
                type="button"
                onClick={() => handleSelect(wallet.publicKey)}
                className={`w-full flex justify-between items-center px-3 py-2 cursor-pointer hover:bg-neutral-800 transition-colors text-left ${
                  value === wallet.publicKey ? "bg-neutral-800" : ""
                }`}
              >
                <div className="flex gap-2 items-center">
                  <SolanaIcon />
                  <span className="font-medium text-sm text-white">
                    Wallet {wallet.index}
                  </span>
                </div>
                <span className="max-w-30 text-xs truncate text-neutral-400">
                  {wallet.publicKey}
                </span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
