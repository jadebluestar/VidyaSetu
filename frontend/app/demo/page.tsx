"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { DEMO_PROFILE } from "@/lib/profile";

export default function DemoPage() {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem("fined-navigator-profile", JSON.stringify(DEMO_PROFILE));
    router.replace("/dashboard");
  }, [router]);

  return (
    <main className="mx-auto max-w-3xl px-6 py-10">
      <div className="rounded-md border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <p className="text-sm text-[#64748B]">Setting up demo profile...</p>
      </div>
    </main>
  );
}
