import { TokenData } from "@/app/home/page";
import Image from "next/image";

export default function DisplayTokens({
  tokens,
}: {
  tokens: TokenData | null;
}) {
  return (
    <div className="mt-8 overflow-y-auto overflow-x-hidden">
      {tokens && Object.keys(tokens).length > 0 ? (
        Object.values(tokens).map((token) => (
          <div
            key={token?.symbol}
            className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#18181b] transition-colors cursor-pointer"
          >
            <Image
              alt={token.symbol || ""}
              src={
                token.icon ||
                "https://explorer.solana.com/_next/static/media/low-contrast-solana-logo.54101b7d.svg"
              }
              width={40}
              height={40}
              className="rounded-full"
            />
            <div className="w-full flex justify-between">
              <div className="flex flex-col truncate text-start">
                <span className="font-medium">{token?.name}</span>
                <span className="font-medium text-sm text-gray-400">
                  {token?.amount?.toFixed(2)} {token?.symbol}
                </span>
              </div>
              <div>$ {(token?.amount * (token?.usdPrice || 1)).toFixed(2)}</div>
            </div>
          </div>
        ))
      ) : (
        <div className="text-gray-500">No tokens to display</div>
      )}
    </div>
  );
}
