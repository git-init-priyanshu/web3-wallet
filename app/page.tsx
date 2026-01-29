import { ExtensionPreview } from "@/components/extension-preview"

export default function Page() {
  return (
    <main className="min-h-screen bg-[#09090b] flex items-center justify-center p-8">
      <div className="relative">
        <div className="absolute -inset-8 bg-violet-500/10 rounded-3xl blur-3xl" />
        <ExtensionPreview />
      </div>
    </main>
  )
}
