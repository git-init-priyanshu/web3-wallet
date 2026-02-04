"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  ArrowLeft,
  ClipboardPaste,
  Copy,
  Download,
  Plus,
  SkipBack,
} from "lucide-react";
import { useState } from "react";
import { generateWallet, importWallet } from "./web3Functions";
import { useRouter } from "next/navigation";
import solanaIcon from "../../public/images.jpeg";
import Image from "next/image";

export default function FirstTimePage() {
  const router = useRouter();

  const [isImportBtnClicked, setIsImportBtnClicked] = useState(false);
  const [recoveryPhrase, setRecoveryPhrase] = useState("");

  const importWalletFunc = async () => {
    await importWallet(recoveryPhrase);
    router.push("/home");
  };
  const generateWalletFunc = async () => {
    await generateWallet();
    router.push("/home");
  };

  const onBackButtonClick = () => {
    if (isImportBtnClicked) {
      setIsImportBtnClicked(false);
    } else {
      history.back();
    }
  };

  const onPasteBtnClick = async ()=>{
    const phrase = await navigator.clipboard.readText();
    console.log(phrase)
  }
  return (
    <div>
      <ArrowLeft
        className="w-8 mt-4 ml-4 text-neutral-500 cursor-pointer"
        onClick={onBackButtonClick}
      />
      <div className="w-full flex flex-col items-center">
        <div className="size-18 flex items-center justify-center bg-neutral-800 rounded-full">
          <Image
            src={solanaIcon}
            alt="solana-icon"
            className="size-10 rounded-full"
          />
        </div>
        <span className="font-medium mt-4 text-xl text-gray-500">
          Add Solana Wallet
        </span>
      </div>
      <div className="flex m-4 mt-10 justify-center h-full">
        {!isImportBtnClicked ? (
          <div className="flex flex-col gap-4">
            <Button
              className="cursor-pointer hover:bg-neutral-800"
              onClick={() => {
                setIsImportBtnClicked(true);
              }}
            >
              <Download />
              Import Wallet
            </Button>
            <Button
              className="cursor-pointer hover:bg-neutral-800"
              onClick={generateWalletFunc}
            >
              <Plus />
              Generate Wallet
            </Button>
          </div>
        ) : (
          <div className="flex flex-col gap-4 w-full">
            <span className="text-center text-gray-200">Import Wallet</span>
            <div className="w-full font-medium">
              <Button className="bg-blue-500/20 text-blue-500 cursor-pointer hover:bg-blue-500/10" onClick={onPasteBtnClick}>
                <Copy />
                Paste
              </Button>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {Array(12)
                .fill(null)
                .map((_, i) => {
                  return (
                    <Input
                      className="outline-0 border border-neutral-800"
                      placeholder={`${i + 1}`}
                      onChange={(e) => setRecoveryPhrase(e.target.value)}
                    />
                  );
                })}
            </div>
            <Button
              className="cursor-pointer hover:bg-neutral-800"
              disabled={!recoveryPhrase}
              onClick={importWalletFunc}
            >
              <Plus />
              Import
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
