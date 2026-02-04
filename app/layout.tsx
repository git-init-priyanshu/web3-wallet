import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PB wallet",
  description: "Created by Priyanshu Bartwal",
  icons: {
    icon: [],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`font-sans antialiased`}>
        <main className="min-h-screen bg-[#09090b] flex items-center justify-center p-8">
          <div className="relative">
            <div className="absolute -inset-8 bg-violet-500/10 rounded-3xl blur-3xl" />
            <div className="w-[360px] h-[600px] bg-[#09090b] text-[#fafafa] flex flex-col rounded-xl shadow-2xl border border-[#27272a] overflow-hidden relative">
              {children}
            </div>
          </div>
        </main>
        <Analytics />
      </body>
    </html>
  );
}
