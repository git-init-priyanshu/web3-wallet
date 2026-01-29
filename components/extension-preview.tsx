"use client"

import { useState } from "react"
import {
  ChevronDown,
  Copy,
  Check,
  ArrowUpRight,
  ArrowDownLeft,
  Wallet,
  ImageIcon,
  History,
  Settings,
  Plus,
  MoreHorizontal,
} from "lucide-react"

type Tab = "tokens" | "nfts" | "activity"

interface WalletAccount {
  id: string
  name: string
  address: string
  balance: string
  avatar: string
}

const wallets: WalletAccount[] = [
  {
    id: "1",
    name: "Main Wallet",
    address: "8xH4...9kLm",
    balance: "$2,847.32",
    avatar: "M",
  },
  {
    id: "2",
    name: "Trading",
    address: "3nJp...7vQr",
    balance: "$542.18",
    avatar: "T",
  },
  {
    id: "3",
    name: "Cold Storage",
    address: "9aKd...2wXz",
    balance: "$12,450.00",
    avatar: "C",
  },
]

const tokens = [
  { symbol: "SOL", name: "Solana", balance: "24.582", value: "$2,458.20", change: "+5.2%", positive: true },
  { symbol: "USDC", name: "USD Coin", balance: "389.12", value: "$389.12", change: "0.0%", positive: true },
  { symbol: "BONK", name: "Bonk", balance: "12,450,000", value: "$0.00", change: "-2.1%", positive: false },
]

const nfts = [
  { name: "Mad Lad #4521", collection: "Mad Lads" },
  { name: "DeGod #8832", collection: "DeGods" },
  { name: "Okay Bear #2341", collection: "Okay Bears" },
  { name: "Clayno #892", collection: "Claynosaurz" },
]

const activities = [
  { type: "send", description: "Sent SOL", amount: "-2.5 SOL", time: "2 min ago" },
  { type: "receive", description: "Received USDC", amount: "+100 USDC", time: "1 hour ago" },
  { type: "send", description: "Sent SOL", amount: "-0.5 SOL", time: "3 hours ago" },
  { type: "receive", description: "Received SOL", amount: "+5.0 SOL", time: "Yesterday" },
]

export function ExtensionPreview() {
  const [selectedWallet, setSelectedWallet] = useState(wallets[0])
  const [isWalletDropdownOpen, setIsWalletDropdownOpen] = useState(false)
  const [activeTab, setActiveTab] = useState<Tab>("tokens")
  const [copied, setCopied] = useState(false)

  const handleCopyAddress = () => {
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleSelectWallet = (wallet: WalletAccount) => {
    setSelectedWallet(wallet)
    setIsWalletDropdownOpen(false)
  }

  return (
    <div className="w-[360px] h-[600px] bg-[#09090b] text-[#fafafa] flex flex-col rounded-xl shadow-2xl border border-[#27272a] overflow-hidden relative">
      {/* Header with Wallet Selector */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-[#27272a]">
        <div className="relative">
          <button
            onClick={() => setIsWalletDropdownOpen(!isWalletDropdownOpen)}
            className="flex items-center gap-2 px-2 py-1.5 rounded-lg hover:bg-[#18181b] transition-colors"
          >
            <div className="w-7 h-7 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
              {selectedWallet.avatar}
            </div>
            <div className="flex flex-col items-start">
              <span className="text-sm font-medium">{selectedWallet.name}</span>
              <span className="text-[10px] text-[#71717a]">{selectedWallet.address}</span>
            </div>
            <ChevronDown className={`w-4 h-4 text-[#71717a] transition-transform ${isWalletDropdownOpen ? "rotate-180" : ""}`} />
          </button>

          {/* Wallet Dropdown */}
          {isWalletDropdownOpen && (
            <div className="absolute top-full left-0 mt-1 w-64 bg-[#18181b] border border-[#27272a] rounded-xl shadow-xl z-50 overflow-hidden">
              <div className="p-2">
                <div className="text-[10px] text-[#71717a] uppercase tracking-wider px-2 py-1.5">
                  Your Wallets
                </div>
                {wallets.map((wallet) => (
                  <button
                    key={wallet.id}
                    onClick={() => handleSelectWallet(wallet)}
                    className={`w-full flex items-center gap-3 px-2 py-2.5 rounded-lg transition-colors ${
                      selectedWallet.id === wallet.id ? "bg-[#27272a]" : "hover:bg-[#27272a]/50"
                    }`}
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center text-xs font-bold">
                      {wallet.avatar}
                    </div>
                    <div className="flex-1 text-left">
                      <div className="text-sm font-medium">{wallet.name}</div>
                      <div className="text-[11px] text-[#71717a]">{wallet.address}</div>
                    </div>
                    <div className="text-xs text-[#a1a1aa]">{wallet.balance}</div>
                  </button>
                ))}
              </div>
              <div className="border-t border-[#27272a] p-2">
                <button className="w-full flex items-center gap-2 px-2 py-2 rounded-lg text-sm text-[#a1a1aa] hover:bg-[#27272a]/50 transition-colors">
                  <Plus className="w-4 h-4" />
                  Add Wallet
                </button>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-1">
          <button
            onClick={handleCopyAddress}
            className="p-2 rounded-lg hover:bg-[#18181b] transition-colors"
          >
            {copied ? (
              <Check className="w-4 h-4 text-emerald-500" />
            ) : (
              <Copy className="w-4 h-4 text-[#71717a]" />
            )}
          </button>
          <button className="p-2 rounded-lg hover:bg-[#18181b] transition-colors">
            <MoreHorizontal className="w-4 h-4 text-[#71717a]" />
          </button>
        </div>
      </header>

      {/* Balance Section */}
      <div className="px-4 py-6 text-center">
        <div className="text-4xl font-bold tracking-tight">{selectedWallet.balance}</div>
        <div className="text-sm text-[#71717a] mt-1">Total Balance</div>
        
        {/* Action Buttons */}
        <div className="flex items-center justify-center gap-3 mt-5">
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:bg-[#27272a] transition-colors">
              <ArrowUpRight className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#a1a1aa]">Send</span>
          </button>
          <button className="flex flex-col items-center gap-1.5">
            <div className="w-12 h-12 rounded-full bg-[#18181b] border border-[#27272a] flex items-center justify-center hover:bg-[#27272a] transition-colors">
              <ArrowDownLeft className="w-5 h-5" />
            </div>
            <span className="text-xs text-[#a1a1aa]">Receive</span>
          </button>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="flex items-center gap-1 px-4 border-b border-[#27272a]">
        {[
          { id: "tokens" as Tab, label: "Tokens" },
          { id: "nfts" as Tab, label: "NFTs" },
          { id: "activity" as Tab, label: "Activity" },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-3 text-sm font-medium transition-colors relative ${
              activeTab === tab.id ? "text-white" : "text-[#71717a] hover:text-[#a1a1aa]"
            }`}
          >
            {tab.label}
            {activeTab === tab.id && (
              <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-white rounded-full" />
            )}
          </button>
        ))}
      </div>

      {/* Content Area */}
      <div className="flex-1 overflow-y-auto">
        {activeTab === "tokens" && (
          <div className="p-2">
            {tokens.map((token) => (
              <div
                key={token.symbol}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#18181b] transition-colors cursor-pointer"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#27272a] to-[#18181b] flex items-center justify-center text-sm font-bold border border-[#3f3f46]">
                  {token.symbol.charAt(0)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium">{token.symbol}</span>
                    <span className="font-medium">{token.value}</span>
                  </div>
                  <div className="flex items-center justify-between text-xs text-[#71717a]">
                    <span>{token.balance} {token.symbol}</span>
                    <span className={token.positive ? "text-emerald-500" : "text-red-500"}>
                      {token.change}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "nfts" && (
          <div className="p-3 grid grid-cols-2 gap-2">
            {nfts.map((nft) => (
              <div
                key={nft.name}
                className="rounded-xl overflow-hidden bg-[#18181b] border border-[#27272a] hover:border-[#3f3f46] transition-colors cursor-pointer"
              >
                <div className="aspect-square bg-gradient-to-br from-violet-500/20 to-fuchsia-500/20 flex items-center justify-center">
                  <ImageIcon className="w-8 h-8 text-[#3f3f46]" />
                </div>
                <div className="p-2.5">
                  <div className="text-xs font-medium truncate">{nft.name}</div>
                  <div className="text-[10px] text-[#71717a] truncate">{nft.collection}</div>
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === "activity" && (
          <div className="p-2">
            {activities.map((activity, index) => (
              <div
                key={index}
                className="flex items-center gap-3 p-3 rounded-xl hover:bg-[#18181b] transition-colors cursor-pointer"
              >
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  activity.type === "send" ? "bg-red-500/10" : "bg-emerald-500/10"
                }`}>
                  {activity.type === "send" ? (
                    <ArrowUpRight className="w-5 h-5 text-red-500" />
                  ) : (
                    <ArrowDownLeft className="w-5 h-5 text-emerald-500" />
                  )}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-sm">{activity.description}</span>
                    <span className={`text-sm font-medium ${
                      activity.type === "send" ? "text-red-500" : "text-emerald-500"
                    }`}>
                      {activity.amount}
                    </span>
                  </div>
                  <div className="text-xs text-[#71717a]">{activity.time}</div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Footer Navigation */}
      <footer className="flex items-center justify-around px-4 py-3 border-t border-[#27272a] bg-[#09090b]">
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-white">
          <Wallet className="w-5 h-5" />
          <span className="text-[10px] font-medium">Wallet</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-[#71717a] hover:text-[#a1a1aa] transition-colors">
          <ImageIcon className="w-5 h-5" />
          <span className="text-[10px] font-medium">NFTs</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-[#71717a] hover:text-[#a1a1aa] transition-colors">
          <History className="w-5 h-5" />
          <span className="text-[10px] font-medium">Activity</span>
        </button>
        <button className="flex flex-col items-center gap-1 p-2 rounded-lg text-[#71717a] hover:text-[#a1a1aa] transition-colors">
          <Settings className="w-5 h-5" />
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </footer>

      {/* Click outside to close dropdown */}
      {isWalletDropdownOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsWalletDropdownOpen(false)}
        />
      )}
    </div>
  )
}
