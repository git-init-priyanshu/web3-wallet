import { ExtensionPreview } from "@/components/extension-preview"
import { Download, Github, Chrome } from "lucide-react"

export default function Page() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-zinc-950 via-zinc-900 to-zinc-950 flex flex-col items-center justify-center p-8 gap-12">
      {/* Header */}
      <div className="text-center space-y-4 max-w-xl">
        <h1 className="text-4xl font-bold text-white tracking-tight">
          QuickActions Extension
        </h1>
        <p className="text-zinc-400 text-lg">
          A sleek Chrome extension with quick productivity actions - copy URLs, take notes, and navigate with ease.
        </p>
      </div>

      {/* Extension Preview */}
      <div className="relative">
        <div className="absolute -inset-4 bg-blue-500/20 rounded-2xl blur-2xl" />
        <ExtensionPreview />
      </div>

      {/* Features */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-2xl w-full">
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
          <h3 className="font-semibold text-white mb-1">Copy Actions</h3>
          <p className="text-sm text-zinc-500">URL, title, or markdown link</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
          <h3 className="font-semibold text-white mb-1">Quick Notes</h3>
          <p className="text-sm text-zinc-500">Persistent notepad</p>
        </div>
        <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 text-center">
          <h3 className="font-semibold text-white mb-1">Navigation</h3>
          <p className="text-sm text-zinc-500">Scroll and reload shortcuts</p>
        </div>
      </div>

      {/* Installation Instructions */}
      <div className="bg-zinc-900/50 border border-zinc-800 rounded-xl p-6 max-w-xl w-full">
        <h2 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <Chrome className="w-5 h-5 text-blue-500" />
          Installation
        </h2>
        <ol className="space-y-3 text-sm text-zinc-400">
          <li className="flex gap-3">
            <span className="font-mono text-blue-500">1.</span>
            Download the <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">/extension</code> folder
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-blue-500">2.</span>
            Run <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">npm install && npm run build</code>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-blue-500">3.</span>
            Open <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">chrome://extensions</code>
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-blue-500">4.</span>
            Enable Developer mode (top right toggle)
          </li>
          <li className="flex gap-3">
            <span className="font-mono text-blue-500">5.</span>
            Click "Load unpacked" and select the <code className="text-zinc-300 bg-zinc-800 px-1.5 py-0.5 rounded">dist</code> folder
          </li>
        </ol>
      </div>

      {/* Tech Stack */}
      <div className="flex gap-3 text-xs text-zinc-500">
        <span className="bg-zinc-800/50 px-3 py-1.5 rounded-full">Vite</span>
        <span className="bg-zinc-800/50 px-3 py-1.5 rounded-full">React</span>
        <span className="bg-zinc-800/50 px-3 py-1.5 rounded-full">TypeScript</span>
        <span className="bg-zinc-800/50 px-3 py-1.5 rounded-full">Tailwind CSS</span>
        <span className="bg-zinc-800/50 px-3 py-1.5 rounded-full">Manifest V3</span>
      </div>
    </main>
  )
}
