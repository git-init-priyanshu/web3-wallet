"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Copy, Plus } from "lucide-react";
import { useState } from "react";
import { importWallet } from "./web3Functions";
import { useRouter } from "next/navigation";

export default function RecoveryPhrase() {
  const router = useRouter();

  const [recoveryPhrase, setRecoveryPhrase] = useState<string[]>(
    Array(12).fill(""),
  );

  const onPasteBtnClick = async () => {
    const phrase = (await navigator.clipboard.readText()) || "";
    const phraseArray = phrase.split(" ");
    if (phraseArray.length !== 12) {
      console.log("Error");
    } else {
      setRecoveryPhrase(phraseArray);
    }
  };

  const importWalletFunc = async () => {
    await importWallet(recoveryPhrase.join(" "));
    router.push("/home");
  };

  const onInputValueChange = (i: number, text: string) => {
    const phraseArray = [...recoveryPhrase];
    phraseArray[i] = text;

    setRecoveryPhrase(phraseArray);
  };
  return (
    <div className="flex flex-col gap-4 w-full">
      <span className="text-center text-gray-400">
        Import with Recovery Phrase
      </span>
      <div className="w-full font-medium">
        <Button
          className="bg-blue-500/20 text-blue-500 cursor-pointer hover:bg-blue-500/10"
          onClick={onPasteBtnClick}
        >
          <Copy />
          Paste
        </Button>
      </div>
      <div className="grid grid-cols-3 gap-2">
        {recoveryPhrase.map((text, i) => {
          return (
            <Input
              key={i}
              className="outline-0 border border-neutral-800"
              value={text}
              placeholder={`${i + 1}`}
              onChange={(e) => onInputValueChange(i, e.target.value)}
            />
          );
        })}
      </div>
      <Button
        className="cursor-pointer hover:bg-neutral-800"
        disabled={recoveryPhrase.findIndex((text) => text === "") !== -1}
        onClick={importWalletFunc}
      >
        <Plus />
        Import
      </Button>
    </div>
  );
}
