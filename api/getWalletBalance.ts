import axios from "axios";

const url = "https://go.getblock.us/c505cc23611d486eaad9e9d018de52cb";

const ApiManager = () => {};

ApiManager.getWalletBalance = async (walletAddress: string) => {
  return await axios.post(
    url,
    {
      jsonrpc: "2.0",
      id: "getblock.io",
      method: "getBalance",
      params: [walletAddress, { commitment: "finalized" }],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

ApiManager.getSolPriceUSD = async () => {
  return await axios.get(
    "https://api.jup.ag/price/v3?ids=So11111111111111111111111111111111111111112",
    {
      headers: {
        "x-api-key": "11c7eccf-619b-4eb4-9a58-145e471d4bc5",
      },
    },
  );
};

ApiManager.getAllTokensOfWallet = async (walletAddress: string) => {
  return await axios.post(
    "https://go.getblock.us/c505cc23611d486eaad9e9d018de52cb",
    {
      jsonrpc: "2.0",
      id: "getblock.io",
      method: "getTokenAccountsByOwner",
      params: [
        walletAddress,
        {
          programId: "TokenkegQfeZyiNwAJbNbGKPFXCWuBvf9Ss623VQ5DA",
        },
        { commitment: "finalized", encoding: "jsonParsed" },
      ],
    },
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
};

ApiManager.getTokenDetails = async (mintId: string) => {
  return await axios.get(
    `https://api.jup.ag/tokens/v2/search?query=${mintId}`,
    {
      headers: {
        "x-api-key": "11c7eccf-619b-4eb4-9a58-145e471d4bc5",
      },
    },
  );
};

export default ApiManager;
