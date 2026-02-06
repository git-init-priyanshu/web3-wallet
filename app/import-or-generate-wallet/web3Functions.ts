import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import ApiManager from "@/api/getWalletBalance";

const getBalance = async (publicKey: string) => {
  const balanceResponse = await ApiManager.getWalletBalance(publicKey);
  const balance = balanceResponse.data.result.value * 10 ** -9;

  const usdPriceResponse = await ApiManager.getSolPriceUSD();
  console.log(usdPriceResponse);
  const usdPrice =
    usdPriceResponse.data["So11111111111111111111111111111111111111112"]
      .usdPrice;

  return [balance, usdPrice];
};

const generateMasterSeed = (phrase?: string) => {
  const mnemonic = phrase || generateMnemonic();
  return mnemonicToSeedSync(mnemonic);
};

const generateWalletSeed = (seed: Buffer<ArrayBufferLike>, index) => {
  const path = `m/44'/501'/${index}'/0'`;

  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  const privateKey = bs58.encode(secret);
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
  return { publicKey, privateKey };
};

export const generateWallet = async () => {
  const prevWalletData = JSON.parse(
    localStorage.getItem("wallet-data") || "[]",
  );
  const masterSeed = generateMasterSeed();
  const { publicKey, privateKey } = generateWalletSeed(
    masterSeed,
    prevWalletData.length + 1,
  );
  const [balance, usdPrice] = await getBalance(publicKey);
  const newWallet = {
    publicKey,
    privateKey,
    balance,
    usdPrice,
    index: prevWalletData.length + 1,
  };

  const newData = [...prevWalletData, newWallet];
  localStorage.setItem("wallet-data", JSON.stringify(newData));
  localStorage.setItem("selected-wallet", JSON.stringify(newWallet));
};

export const importWallet = async (phrase: string) => {
  if (!validateMnemonic(phrase)) {
    return;
  }
  const prevWalletData = JSON.parse(
    localStorage.getItem("wallet-data") || "[]",
  );
  const masterSeed = generateMasterSeed(phrase);
  const { publicKey, privateKey } = generateWalletSeed(
    masterSeed,
    prevWalletData.length + 1,
  );
  const [balance, usdPrice] = await getBalance(publicKey);
  const newWallet = {
    publicKey,
    privateKey,
    balance,
    usdPrice,
    index: prevWalletData.length + 1,
  };

  const newData = [...prevWalletData, newWallet];
  localStorage.setItem("wallet-data", JSON.stringify(newData));
  localStorage.setItem("selected-wallet", JSON.stringify(newWallet));
};
