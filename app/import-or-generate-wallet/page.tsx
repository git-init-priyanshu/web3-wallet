"use client";

import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import RecoveryPhrase from "./-recovery-phrase";
import ImportPrivateKey from "./-private-key";
import Home from "./-home";

export type Page = "home" | "recovery-phrase" | "private-key";

// endless olive castle pear west sphere cluster couch pepper someone lumber add
export default function FirstTimePage() {
  const [page, setPage] = useState<Page>("home");

  const onBackButtonClick = () => {
    if (page !== "home") {
      setPage("home");
    } else {
      history.back();
    }
  };

  switch (page) {
    case "recovery-phrase":
      return (
        <div>
          <ArrowLeft
            className="w-8 mt-4 ml-4 text-neutral-500 cursor-pointer"
            onClick={onBackButtonClick}
          />
          <div className="m-4">
            <RecoveryPhrase />
          </div>
        </div>
      );

    case "private-key":
      return (
        <div>
          <ArrowLeft
            className="w-8 mt-4 ml-4 text-neutral-500 cursor-pointer"
            onClick={onBackButtonClick}
          />
          <div className="m-4">
            <ImportPrivateKey />
          </div>
        </div>
      );

    case "home":
    default:
      return (
        <div>
          <ArrowLeft
            className="w-8 mt-4 ml-4 text-neutral-500 cursor-pointer"
            onClick={onBackButtonClick}
          />
          <Home setPage={setPage} />
        </div>
      );
  }
}
