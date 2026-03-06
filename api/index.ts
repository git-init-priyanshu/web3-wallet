import connection from "@/lib/getRPCconnection";
import {
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  sendAndConfirmTransaction,
  SystemProgram,
  Transaction,
} from "@solana/web3.js";
import axios from "axios";
import bs58 from "bs58"

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const JUP_X_API_KEY = process.env.NEXT_PUBLIC_JUP_X_API_KEY || "";
const ApiManager = () => {};

ApiManager.getWalletBalance = async (walletAddress: string) => {
  const publicKey = new PublicKey(walletAddress);
  try {
    const balanceInLamports = await connection().getBalance(publicKey);

    const balanceInSol = balanceInLamports / LAMPORTS_PER_SOL;

    return balanceInSol;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
};

ApiManager.getSolPriceUSD = async () => {
  try {
    const res = await axios.get(
      "https://api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112",
      {
        headers: {
          "x-api-key": JUP_X_API_KEY,
        },
      },
    );

    return res.data["So11111111111111111111111111111111111111112"].usdPrice;
  } catch (error) {
    console.error("Error fetching sol price:", error);
    return null;
  }
};

ApiManager.getAllTokensOfWallet = async (walletAddress: string) => {
  const publicKey = new PublicKey(walletAddress);
  try {
    const tokens = await connection().getTokenAccountBalance(publicKey);
    console.log(tokens);

    return tokens;
  } catch (error) {
    console.error("Error fetching balance:", error);
    return null;
  }
};

ApiManager.getTokenDetails = async (mintId: string) => {
  return await axios.get(
    `https://api.jup.ag/tokens/v2/search?query=${mintId}`,
    {
      headers: {
        "x-api-key": JUP_X_API_KEY,
      },
    },
  );
};

ApiManager.validatePublicKey = (keyString: string) => {
  try {
    const publicKey = new PublicKey(keyString);
    const isOnCurve = PublicKey.isOnCurve(publicKey.toBytes());

    if (publicKey && isOnCurve) {
      return true;
    } else {
      return false;
    }
  } catch (error) {
    return false;
  }
};

ApiManager.send = async (
  from: string,
  pvtKey: string,
  to: string,
  amount: number,
) => {
  const conn = connection();
  const account = Keypair.fromSecretKey(bs58.decode(pvtKey));

  const transaction = new Transaction().add(
    SystemProgram.transfer({
      fromPubkey: new PublicKey(from),
      toPubkey: new PublicKey(to),
      lamports: LAMPORTS_PER_SOL * amount,
    }),
  );

  const res = await sendAndConfirmTransaction(conn, transaction, [account]);
  return res;
};

export default ApiManager;
