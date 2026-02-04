import nacl from "tweetnacl";
import { generateMnemonic, mnemonicToSeedSync, validateMnemonic } from "bip39";
import bs58 from "bs58";
import { derivePath } from "ed25519-hd-key";
import { Keypair } from "@solana/web3.js";
import ApiManager from "@/api/getWalletBalance";

const getBalance = async (publicKey: string) => {
  const response = await ApiManager.getWalletBalance(publicKey);
  const balance = response.data.result.value * 10 ** -9;

  return balance;
};

const generateMasterSeed = (phrase?: string) => {
  const mnemonic = phrase || generateMnemonic();
  return mnemonicToSeedSync(mnemonic);
};

const generateWalletSeed = (seed: Buffer<ArrayBufferLike>) => {
  const i = 0;
  const path = `m/44'/501'/${i}'/0'`;

  const derivedSeed = derivePath(path, seed.toString("hex")).key;
  const secret = nacl.sign.keyPair.fromSeed(derivedSeed).secretKey;

  const privateKey = bs58.encode(secret);
  const publicKey = Keypair.fromSecretKey(secret).publicKey.toBase58();
  return { publicKey, privateKey };
};

export const generateWallet = async () => {
  const masterSeed = generateMasterSeed();
  const { publicKey, privateKey } = generateWalletSeed(masterSeed);
  const balance = await getBalance(publicKey);

  const walletData = JSON.parse(localStorage.getItem("wallet-data") || "[]");
  const newData = [...walletData, { publicKey, privateKey, balance }];
  localStorage.setItem("wallet-data", JSON.stringify(newData));
};

export const importWallet = async (phrase: string) => {
  if (!validateMnemonic(phrase)) {
    return;
  }
  const masterSeed = generateMasterSeed(phrase);
  const { publicKey, privateKey } = generateWalletSeed(masterSeed);
  const balance = await getBalance(publicKey);

  const walletData = JSON.parse(localStorage.getItem("wallet-data") || "[]");
  const newData = [...walletData, { publicKey, privateKey, balance }];
  localStorage.setItem("wallet-data", JSON.stringify(newData));
};
