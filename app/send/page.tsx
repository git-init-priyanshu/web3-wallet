"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ArrowLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { Wallet } from "../home/page";
import { useRouter } from "next/navigation";

export default function Page() {
  const router = useRouter();

  const [isNextBtnClicked, setIsNextBtnClicked] = useState(false);
  const [walletData, setWalletData] = useState<Wallet[]>([]);

  useEffect(() => {
    const walletData = localStorage.getItem("wallet-data");
    if (!walletData) {
      router.push("/import-or-generate-wallet");
    } else {
      setWalletData(JSON.parse(walletData));
    }
  }, []);

  const onBackButtonClick = () => {
    if (isNextBtnClicked) {
      setIsNextBtnClicked(false);
    } else {
      history.back();
    }
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
        <Input
          className="outline-0 border border-neutral-800 bg-neutral-900 mb-3"
          placeholder="Enter address"
        />
        <span className="text-xs font-medium text-gray-400">
          Your addresses
        </span>
        <div>
          {walletData?.map((wallet) => {
            return (
              <div className="flex justify-between items-center  cursor-pointer hover:bg-neutral-900 rounded-md p-2">
                <div className="flex gap-2 items-center">
                  <svg
                    viewBox="0 0 36 36"
                    width="36"
                    height="36"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <defs>
                      <linearGradient
                        x1="90.737%"
                        y1="34.776%"
                        x2="35.509%"
                        y2="55.415%"
                        id="sol-a"
                      >
                        <stop stop-color="#00FFA3" offset="0%" />
                        <stop stop-color="#DC1FFF" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="66.588%"
                        y1="43.8%"
                        x2="11.36%"
                        y2="64.439%"
                        id="sol-b"
                      >
                        <stop stop-color="#00FFA3" offset="0%" />
                        <stop stop-color="#DC1FFF" offset="100%" />
                      </linearGradient>
                      <linearGradient
                        x1="78.586%"
                        y1="39.317%"
                        x2="23.358%"
                        y2="59.956%"
                        id="sol-c"
                      >
                        <stop stop-color="#00FFA3" offset="0%" />
                        <stop stop-color="#DC1FFF" offset="100%" />
                      </linearGradient>
                    </defs>
                    <g fill="none" fill-rule="nonzero">
                      <circle fill="#181E33" cx="18" cy="18" r="18" />
                      <path
                        d="M3.9 14.355a.785.785 0 0 1 .554-.23h19.153c.35 0 .525.423.277.67l-3.783 3.784a.785.785 0 0 1-.555.23H.393a.392.392 0 0 1-.277-.67l3.783-3.784z"
                        fill="url(#sol-a)"
                        transform="translate(6 9)"
                      />
                      <path
                        d="M3.9.23c.15-.146.35-.23.554-.23h19.153c.35 0 .525.422.277.67l-3.783 3.783a.785.785 0 0 1-.555.23H.393a.392.392 0 0 1-.277-.67L3.899.229z"
                        fill="url(#sol-b)"
                        transform="translate(6 9)"
                      />
                      <path
                        d="M20.1 7.247a.785.785 0 0 0-.554-.23H.393a.392.392 0 0 0-.277.67l3.783 3.784c.145.145.344.23.555.23h19.153c.35 0 .525-.423.277-.67l-3.783-3.784z"
                        fill="url(#sol-c)"
                        transform="translate(6 9)"
                      />
                    </g>
                  </svg>
                  <span className="font-medium">Wallet {wallet.index}</span>
                </div>
                <span className="max-w-24 text-sm truncate text-gray-400">
                  {wallet.publicKey}
                </span>
              </div>
            );
          })}
        </div>
      </div>
      <Button
        disabled={true}
        className="w-full bg-white text-black text-md font-semibold absolute bottom-4"
        style={{ width: "calc(100% - 2rem)" }}
      >
        Next
      </Button>
    </div>
  );
}
