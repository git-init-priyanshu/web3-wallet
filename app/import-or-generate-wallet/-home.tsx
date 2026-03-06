import Image from "next/image";
import solanaIcon from "../../public/images.jpeg";
import { Button } from "@/components/ui/button";
import { ChevronRight, Key, NotebookPen, Plus } from "lucide-react";
import { generateWallet } from "./web3Functions";
import { useRouter } from "next/navigation";
import { Page } from "./page";

export default function Home({
  setPage,
}: {
  setPage: React.Dispatch<React.SetStateAction<Page>>;
}) {
  const router = useRouter();

  const generateWalletFunc = async () => {
    await generateWallet();
    router.push("/home");
  };

  return (
    <>
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
      <div className="flex m-4 mt-10 w-full h-full">
        <div className="flex flex-col w-full mr-8">
          <span className="text-gray-500 mb-2">Import Wallet</span>
          <Button
            className="cursor-pointer hover:bg-neutral-800 py-6 mb-2"
            onClick={() => setPage("recovery-phrase")}
          >
            <div className="flex gap-2 items-center justify-between w-full">
              <div className="flex gap-2 items-center text-md">
                <NotebookPen className="text-gray-400" />
                Recovery Phrase
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </Button>
          <Button
            className="cursor-pointer hover:bg-neutral-800 py-6 mb-2"
            onClick={() => setPage("private-key")}
          >
            <div className="flex gap-2 items-center justify-between w-full">
              <div className="flex gap-2 items-center text-md">
                <Key className="text-gray-400" />
                Private Key
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </Button>
          <span className="text-gray-500 mb-2">Create Wallet</span>
          <Button
            className="cursor-pointer hover:bg-neutral-800 py-6"
            onClick={generateWalletFunc}
          >
            <div className="flex gap-2 items-center justify-between w-full">
              <div className="flex gap-2 items-center text-md">
                <Plus className="text-gray-400" />
                Create new Wallet
              </div>
              <ChevronRight className="text-gray-400" />
            </div>
          </Button>
        </div>
      </div>
    </>
  );
}
