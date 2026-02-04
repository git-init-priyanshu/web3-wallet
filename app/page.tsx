"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
export default function Page() {
  const router = useRouter();

  useEffect(() => {
    const walletData = localStorage.getItem("wallet-data");
    if (!walletData) {
      router.push("/import-or-generate-wallet");
    } else {
      router.push("home");
    }
  }, []);
  return <div></div>;
}
