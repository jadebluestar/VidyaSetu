"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";

const links = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/loan-offers", label: "Loan Offers" },
  { href: "/recession-ranker", label: "Course Ranker" }
];

export default function Navbar() {
  return (
    <nav className="h-14 border-b border-[#E2E8F0] bg-white px-6">
      <div className="mx-auto flex h-full max-w-6xl items-center justify-between">
        <Link href="/dashboard" className="text-base font-semibold text-[#0F2C5A]">
          VidyaSetu
        </Link>
        <div className="flex items-center gap-6">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-[#64748B] hover:text-[#0F2C5A]"
            >
              {link.label}
            </Link>
          ))}
          <button className="flex items-center gap-1 text-sm text-[#0F2C5A]" type="button">
            Profile
            <ChevronDown size={16} strokeWidth={1.5} />
          </button>
        </div>
      </div>
    </nav>
  );
}
