'use client';

import { useState, useEffect, useCallback } from 'react'
import {
  Zap,
  Link,
  Type,
  FileText,
  ArrowUp,
  ArrowDown,
  RotateCw,
  StickyNote,
  Trash2,
  Copy,
  Check,
} from 'lucide-react'

declare const chrome: typeof globalThis.chrome

interface TabInfo {
  title: string
  url: string
  id?: number
}

function App() {
  const [tab, setTab] = useState<TabInfo>({ title: 'Loading...', url: '' })
  const [note, setNote] = useState('')
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

  useEffect(() => {
    // Get current tab info
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
      if (tabs[0]) {
        setTab({
          title: tabs[0].title || 'Unknown',
          url: tabs[0].url || '',
          id: tabs[0].id,
        })
      }
    })

    // Load saved note
    chrome.storage.local.get(['quickNote'], (result) => {
      if (result.quickNote) {
        setNote(result.quickNote)
      }
    })
  }, [])

  const handleNoteChange = (value: string) => {
    setNote(value)
    chrome.storage.local.set({ quickNote: value })
  }

  const copyUrl = async () => {
    if (await copyToClipboard(tab.url)) {
      showToast('URL copied!')
    }
  }

  const copyTitle = async () => {
    if (await copyToClipboard(tab.title)) {
      showToast('Title copied!')
    }
  }

  const copyMarkdown = async () => {
    const markdown = `[${tab.title}](${tab.url})`
    if (await copyToClipboard(markdown)) {
      showToast('Markdown copied!')
    }
  }

  const scrollTo = (direction: 'top' | 'bottom') => {
    if (tab.id) {
      chrome.scripting.executeScript({
        target: { tabId: tab.id },
        func: (dir: string) => {
          window.scrollTo({
            top: dir === 'top' ? 0 : document.body.scrollHeight,
            behavior: 'smooth',
          })
        },
        args: [direction],
      })
      showToast(`Scrolled to ${direction}`)
    }
  }

  const reloadPage = () => {
    if (tab.id) {
      chrome.tabs.reload(tab.id)
      showToast('Page reloaded')
    }
  }

  const clearNote = () => {
    setNote('')
    chrome.storage.local.set({ quickNote: '' })
    showToast('Note cleared')
  }

  const copyNote = async () => {
    if (note.trim()) {
      if (await copyToClipboard(note)) {
        showToast('Note copied!')
      }
    } else {
      showToast('Note is empty')
    }
  }

  const actions = [
    { icon: Link, label: 'Copy URL', onClick: copyUrl },
    { icon: Type, label: 'Copy Title', onClick: copyTitle },
    { icon: FileText, label: 'Markdown', onClick: copyMarkdown },
    { icon: ArrowUp, label: 'Scroll Top', onClick: () => scrollTo('top') },
    { icon: ArrowDown, label: 'Scroll Down', onClick: () => scrollTo('bottom') },
    { icon: RotateCw, label: 'Reload', onClick: reloadPage },
  ]

  return (
    <div className="bg-background text-foreground p-4 flex flex-col gap-4">
      {/* Header */}
      <header className="flex items-center justify-between">
        <div className="flex items-center gap-2 font-semibold text-sm">
          <Zap className="w-4 h-4 text-accent" />
          <span>QuickActions</span>
        </div>
      </header>

      {/* Page Info */}
      <div className="flex items-center justify-between gap-3">
        <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wide shrink-0">
          Current Tab
        </span>
        <span
          className="text-xs text-muted truncate max-w-[200px] text-right"
          title={tab.title}
        >
          {tab.title}
        </span>
      </div>

      {/* Actions Grid */}
      <div className="grid grid-cols-3 gap-2">
        {actions.map((action) => (
          <button
            key={action.label}
            onClick={action.onClick}
            className="flex flex-col items-center justify-center gap-1.5 py-3.5 px-2 bg-surface border border-border rounded-lg text-foreground cursor-pointer transition-all duration-150 text-[11px] font-medium hover:bg-surface-hover hover:border-muted-foreground active:scale-[0.97] group"
          >
            <action.icon className="w-4 h-4 text-muted transition-colors group-hover:text-accent" />
            {action.label}
          </button>
        ))}
      </div>

      {/* Divider */}
      <div className="h-px bg-border" />

      {/* Notes Section */}
      <div className="flex flex-col gap-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-muted uppercase tracking-wide">
          <StickyNote className="w-3.5 h-3.5 text-muted-foreground" />
          Quick Note
        </div>
        <textarea
          value={note}
          onChange={(e) => handleNoteChange(e.target.value)}
          placeholder="Jot down a quick note..."
          className="w-full min-h-[80px] p-3 bg-surface border border-border rounded-lg text-foreground text-[13px] resize-y outline-none transition-colors placeholder:text-muted-foreground focus:border-accent"
        />
        <div className="flex gap-2">
          <button
            onClick={copyNote}
            className="flex-1 py-2.5 px-4 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 bg-accent text-white hover:bg-accent-hover"
          >
            Copy Note
          </button>
          <button
            onClick={clearNote}
            className="flex-1 py-2.5 px-4 rounded-lg text-xs font-medium cursor-pointer transition-all duration-150 bg-surface text-muted border border-border hover:bg-surface-hover hover:text-foreground"
          >
            Clear
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="flex justify-center pt-1">
        <span className="text-[10px] text-muted-foreground">v1.0.0</span>
      </footer>

      {/* Toast */}
      <div
        className={`fixed bottom-5 left-1/2 -translate-x-1/2 bg-surface-hover border border-border py-2.5 px-4 rounded-lg flex items-center gap-2 text-xs font-medium text-foreground z-50 transition-all duration-300 ${
          toast
            ? 'translate-y-0 opacity-100'
            : 'translate-y-[100px] opacity-0 pointer-events-none'
        }`}
      >
        <Check className="w-4 h-4 text-success" />
        {toast}
      </div>
    </div>
  )
}

export default App
