"use client";

import { MapPin, MessageCircle } from "lucide-react";
import { useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import StatusBadge from "@/components/ui/StatusBadge";

type Timeline = { job_title: string; city: string; salary_lpa: number; loan_status: string; lifestyle: string };

type ResultType = {
  abroad: Record<string, Timeline>;
  india: Record<string, Timeline>;
  comparison: Record<string, string>;
};

const skeleton = [1, 2, 3];

export default function FutureSelfPage() {
  const [data, setData] = useState<ResultType | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const runSimulation = async () => {
    setLoading(true);
    setError(null);
    const profile = JSON.parse(
      localStorage.getItem("fined-navigator-profile") || localStorage.getItem("ddisha-profile") || "{}"
    );
    try {
      const res = await fetch("/api/future-self", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(profile) });
      const json = await res.json();
      if (!res.ok || json?.error) {
        throw new Error(json?.error || "Could not generate simulation right now.");
      }
      setData({
        abroad: json?.abroad && typeof json.abroad === "object" ? json.abroad : {},
        india: json?.india && typeof json.india === "object" ? json.india : {},
        comparison: json?.comparison && typeof json.comparison === "object" ? json.comparison : {}
      });
    } catch (err) {
      setData(null);
      setError(err instanceof Error ? err.message : "Could not generate simulation right now.");
    } finally {
      setLoading(false);
    }
  };

  const copySummary = async () => {
    if (!data) return;
    await navigator.clipboard.writeText(`Path A net worth at 32: ${data.comparison.net_worth_at_32_abroad || "N/A"}; Path B: ${data.comparison.net_worth_at_32_india || "N/A"}`);
    window.open("https://wa.me/?text=I%20shared%20my%20future%20self%20simulation%20from%20AbroadReady", "_blank");
  };

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <SectionHeader title="Future Self Simulator" subtitle="See where each path leads by age 32" />
      <div className="mb-6 flex items-center justify-between">
        <p className="text-xs text-[#64748B]">Arjun Mehta · MS CS · USA · GRE 320 · CGPA 8.2</p>
        <button className="text-xs text-[#0F2C5A]">Edit Profile</button>
      </div>
      <button onClick={runSimulation} className="mb-6 h-10 rounded-md bg-[#0F2C5A] px-6 text-sm font-medium text-white hover:bg-[#1A3F7A]">Run Simulation</button>
      {error ? <p className="mb-4 text-sm text-[#B91C1C]">{error}</p> : null}

      {loading ? (
        <div className="grid grid-cols-2 gap-6">
          {[0, 1].map((col) => (
            <div key={col} className="space-y-3">{skeleton.map((i) => <div key={i} className="h-24 animate-pulse rounded-md border border-[#E2E8F0] bg-white" />)}</div>
          ))}
        </div>
      ) : null}

      {data ? (
        <>
          <div className="grid grid-cols-2 gap-6">
            {["abroad", "india"].map((path, idx) => (
              <div key={path} className={idx === 0 ? "border-r border-[#E2E8F0] pr-6" : "pl-6"}>
                <div className="mb-3 flex items-center justify-between">
                  <h3 className="text-sm font-semibold text-[#0F2C5A]">{idx === 0 ? "Path A: Study Abroad" : "Path B: Stay in India"}</h3>
                  {idx === 0 ? <span className="rounded border border-[#E2E8F0] px-2 py-0.5 text-xs text-[#64748B]">US</span> : null}
                </div>
                {Object.entries(data[path as "abroad" | "india"]).map(([age, value]) => (
                  <div key={age} className="mb-3 rounded-md border border-[#E2E8F0] bg-white p-4 shadow-sm">
                    <p className="text-xs font-medium uppercase tracking-wide text-[#64748B]">{age.replace("_", " ")}</p>
                    <p className="mt-1 text-sm font-semibold text-[#0F2C5A]">{value.job_title}</p>
                    <p className="mt-1 flex items-center gap-1 text-xs text-[#64748B]"><MapPin size={12} strokeWidth={1.5} />{value.city}</p>
                    <p className="mt-1 text-base font-semibold text-[#0F2C5A]">₹{value.salary_lpa} LPA</p>
                    <StatusBadge tone="amber">{value.loan_status}</StatusBadge>
                    <p className="mt-2 text-xs italic text-[#64748B]">{value.lifestyle}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>

          <div className="mt-6 rounded-md border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <div className="grid grid-cols-3 gap-4 text-sm">
              <p className="text-[#64748B]">Total loan cost</p><p className="font-medium text-[#0F2C5A]">{data.comparison.total_loan_cost_abroad}</p><p className="font-medium text-[#0F2C5A]">{data.comparison.total_loan_cost_india}</p>
              <p className="text-[#64748B]">Monthly EMI (peak)</p><p className="font-medium text-[#0F2C5A]">{data.comparison.peak_emi_abroad}</p><p className="font-medium text-[#0F2C5A]">{data.comparison.peak_emi_india}</p>
              <p className="text-[#64748B]">Loan-free by</p><p className="font-medium text-[#0F2C5A]">{data.comparison.loan_free_year_abroad}</p><p className="font-medium text-[#0F2C5A]">{data.comparison.loan_free_year_india}</p>
            </div>
          </div>

          <button onClick={copySummary} className="mt-4 inline-flex h-10 items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-6 text-sm text-[#0F2C5A]"><MessageCircle size={16} strokeWidth={1.5} />Share with family</button>
        </>
      ) : null}
    </main>
  );
}
