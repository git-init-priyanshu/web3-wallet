"use client"

import { useState, useCallback } from "react"
import {
  Zap,
  Link,
  Type,
  FileText,
  ArrowUp,
  ArrowDown,
  RotateCw,
  StickyNote,
  Check,
} from "lucide-react"

export function ExtensionPreview() {
  const [note, setNote] = useState("")
  const [toast, setToast] = useState<string | null>(null)

  const showToast = useCallback((message: string) => {
    setToast(message)
    setTimeout(() => setToast(null), 2000)
  }, [])

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text)
      return true
    } catch {
      return false
    }
  }

  const mockTab = {
    title: "Example Page - Chrome Extension Demo",
    url: "https://example.com/demo-page",
  }

  const copyUrl = async () => {
    if (await copyToClipboard(mockTab.url)) {
      showToast("URL copied!")
    }
  }

  const copyTitle = async () => {
    if (await copyToClipboard(mockTab.title)) {
      showToast("Title copied!")
    }
  }

  const copyMarkdown = async () => {
    const markdown = `[${mockTab.title}](${mockTab.url})`
    if (await copyToClipboard(markdown)) {
      showToast("Markdown copied!")
    }
  }

  const scrollTo = (direction: "top" | "bottom") => {
    showToast(`Would scroll to ${direction}`)
  }

  const reloadPage = () => {
    showToast("Would reload page")
  }

  const clearNote = () => {
    setNote("")
    showToast("Note cleared")
  }

  const copyNote = async () => {
    if (note.trim()) {
      if (await copyToClipboard(note)) {
        showToast("Note copied!")
      }
    } else {
      showToast("Note is empty")
    }
  }

  const actions = [
    { icon: Link, label: "Copy URL", onClick: copyUrl },
    { icon: Type, label: "Copy Title", onClick: copyTitle },
    { icon: FileText, label: "Markdown", onClick: copyMarkdown },
    { icon: ArrowUp, label: "Scroll Top", onClick: () => scrollTo("top") },
    { icon: ArrowDown, label: "Scroll Down", onClick: () => scrollTo("bottom") },
    { icon: RotateCw, label: "Reload", onClick: reloadPage },
  ]

  return (
    <div className="w-[320px] min-h-[400px] bg-[#0a0a0a] text-[#fafafa] p-4 flex flex-col gap-4 rounded-xl shadow-2xl border border-[#262626]">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Zap className="w-4 h-4 text-[#3b82f6]" />
          <span>QuickActions</span>
        </div>
      </header>

      {/* Page Info */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-[#71717a] uppercase tracking-wide shrink-0">
          Current Tab
        </span>
        <span
          className="text-xs text-[#a1a1aa] truncate max-w-[200px] text-right"
          title={mockTab.title}
        >
          {mockTab.title}
        </span>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 bg-[#141414] border border-[#262626] rounded-lg text-[#fafafa] cursor-pointer transition-all duration-150 text-[11px] font-medium hover:bg-[#1a1a1a] hover:border-[#71717a] active:scale-[0.97] group"
          >
            <action.icon className="w-4 h-4 text-[#a1a1aa] transition-colors group-hover:text-[#3b82f6]" />
            {action.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-[#262626]" />

      {/* Notes Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-[#a1a1aa] uppercase tracking-wide">
          <StickyNote className="w-3.5 h-3.5 text-[#71717a]" />
          Quick Note
        </div>
        <textarea
          value={note}
          onChange={(e) => setNote(e.target.value)}
          placeholder="Jot down a quick note..."
          className="w-full min-h-[80px] p-3 bg-[#141414] border border-[#262626] rounded-lg text-[#fafafa] text-[13px] resize-y outline-none transition-colors placeholder:text-[#71717a] focus:border-[#3b82f6]"
        />
        <div className="flex gap-2">
          <button
            onClick={copyNote}
            className="flex-1 py-2.5 px-4 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 bg-[#3b82f6] text-white hover:bg-[#2563eb]"
          >
            Copy Note
          </button>
          <button
            onClick={clearNote}
            className="flex-1 py-2.5 px-4 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 bg-[#141414] text-[#a1a1aa] border border-[#262626] hover:bg-[#1a1a1a] hover:text-[#fafafa]"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center pt-1">
        <span className="text-[10px] text-[#71717a]">v1.0.0</span>
      </footer>

      {/* Toast */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-[#1a1a1a] border border-[#262626] py-2.5 px-4 rounded-lg flex items-center gap-2 text-xs font-medium text-[#fafafa] z-50 transition-all duration-300 ${
          toast
            ? "translate-y-0 opacity-100"
            : "translate-y-[100px] opacity-0 pointer-events-none"
        }`}
      >
        <Check className="w-4 h-4 text-[#22c55e]" />
        {toast}
      </div>
    </div>
  )
}
