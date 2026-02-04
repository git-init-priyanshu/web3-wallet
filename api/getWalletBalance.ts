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

export default ApiManager;
