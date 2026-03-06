import { Connection } from "@solana/web3.js";
import { cache } from "react";

const RPC_URL = process.env.NEXT_PUBLIC_RPC_URL || "";
const connection = cache(() => new Connection(RPC_URL, "confirmed"));
export default connection;
