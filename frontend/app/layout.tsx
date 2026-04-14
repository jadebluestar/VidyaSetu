import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"]
});

export const metadata: Metadata = {
  title: "FinEd Navigator",
  description: "AI-powered study-abroad planning platform"
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.className} min-h-screen bg-[#F5F7FA] text-[#0F2C5A]`}>
        <div className="flex min-h-screen flex-col bg-[#F5F7FA]">
          <Navbar />
          <div className="flex-1">{children}</div>
          <footer className="border-t border-[#E2E8F0] bg-white px-6 py-4 text-xs text-[#64748B]">
            <div className="mx-auto grid max-w-6xl grid-cols-3 gap-4">
              <p>FinEd Navigator © 2026</p>
              <p className="text-center">
                Information only, not financial or legal advice. Loan decisions subject to lender approval.
              </p>
            </div>
          </footer>
        </div>
      </body>
    </html>
  );
}
