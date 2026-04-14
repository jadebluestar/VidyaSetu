"use client";

import { AlertCircle, CheckCircle } from "lucide-react";
import { useState } from "react";

type RiskResult = {
  score: number;
  risk_level: string;
  red_flags: { flag: string; explanation: string }[];
  fixes: { action: string; detail: string }[];
};

export default function VisaRiskPage() {
  const [result, setResult] = useState<RiskResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [form, setForm] = useState({
    country: "USA",
    course: "MS CS",
    funding: "Education Loan",
    bank_balance: 12,
    education_gap: "None",
    backlogs: "None",
    prior_rejection: false
  });

  const submit = async () => {
    setError(null);
    try {
      const res = await fetch("/api/visa-risk", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
      const json = await res.json();
      if (!res.ok || json?.error) {
        throw new Error(json?.error || "Could not analyze visa risk right now.");
      }
      setResult({
        score: typeof json?.score === "number" ? json.score : 0,
        risk_level: typeof json?.risk_level === "string" ? json.risk_level : "Unknown",
        red_flags: Array.isArray(json?.red_flags) ? json.red_flags : [],
        fixes: Array.isArray(json?.fixes) ? json.fixes : []
      });
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : "Could not analyze visa risk right now.");
    }
  };

  const tone = (score: number) => (score < 30 ? "#166534" : score <= 60 ? "#92400E" : "#991B1B");

  return (
    <main className="mx-auto grid max-w-3xl grid-cols-2 gap-6 px-6 py-8">
      <div className="rounded-md border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <div className="space-y-4">
          <select className="h-10 w-full rounded-md border border-[#E2E8F0] px-3 text-sm" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>{["USA", "UK", "Canada", "Australia"].map((v) => <option key={v}>{v}</option>)}</select>
          <input className="h-10 w-full rounded-md border border-[#E2E8F0] px-3 text-sm" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })} />
          <select className="h-10 w-full rounded-md border border-[#E2E8F0] px-3 text-sm" value={form.funding} onChange={(e) => setForm({ ...form, funding: e.target.value })}>{["Self-funded", "Education Loan", "Scholarship", "Partial scholarship"].map((v) => <option key={v}>{v}</option>)}</select>
          <div className="relative"><input type="number" className="h-10 w-full rounded-md border border-[#E2E8F0] px-3 pr-8 text-sm" value={form.bank_balance} onChange={(e) => setForm({ ...form, bank_balance: Number(e.target.value) })} /><span className="absolute right-3 top-2.5 text-sm text-[#64748B]">L</span></div>
          <select className="h-10 w-full rounded-md border border-[#E2E8F0] px-3 text-sm" value={form.education_gap} onChange={(e) => setForm({ ...form, education_gap: e.target.value })}>{["None", "1-6 months", "6-12 months", "12+ months"].map((v) => <option key={v}>{v}</option>)}</select>
          <select className="h-10 w-full rounded-md border border-[#E2E8F0] px-3 text-sm" value={form.backlogs} onChange={(e) => setForm({ ...form, backlogs: e.target.value })}>{["None", "1-2", "3-5", "5+"].map((v) => <option key={v}>{v}</option>)}</select>
          <div className="flex gap-4 text-sm"><label><input type="radio" checked={form.prior_rejection} onChange={() => setForm({ ...form, prior_rejection: true })} /> Yes</label><label><input type="radio" checked={!form.prior_rejection} onChange={() => setForm({ ...form, prior_rejection: false })} /> No</label></div>
          <button onClick={submit} className="h-10 w-full rounded-md bg-[#0F2C5A] px-6 text-sm font-medium text-white hover:bg-[#1A3F7A]">Analyse Risk</button>
        </div>
      </div>

      <div className="sticky top-6 h-fit rounded-md border border-[#E2E8F0] bg-white p-6 shadow-sm">
        {error ? <p className="mb-3 text-sm text-[#B91C1C]">{error}</p> : null}
        {result ? (
          <>
            <div className="text-center"><p className="text-4xl font-semibold text-[#0F2C5A]">{result.score}<span className="text-base text-[#64748B]">/100</span></p><p className="text-sm text-[#64748B]">Risk Score</p></div>
            <div className="mt-3 h-2 rounded bg-[#E2E8F0]"><div className="h-2 rounded" style={{ width: `${result.score}%`, backgroundColor: tone(result.score) }} /></div>
            <h3 className="mt-5 mb-3 text-sm font-semibold text-[#0F2C5A]">Risk Factors</h3>
            <div className="space-y-3">{result.red_flags.map((item) => <div key={item.flag}><p className="flex items-center gap-2 text-sm text-[#0F2C5A]"><AlertCircle size={16} strokeWidth={1.5} className="text-[#991B1B]" />{item.flag}</p><p className="text-xs text-[#64748B]">{item.explanation}</p></div>)}</div>
            <h3 className="mt-5 mb-3 text-sm font-semibold text-[#0F2C5A]">How to Improve</h3>
            <div className="space-y-3">{result.fixes.map((item) => <div key={item.action}><p className="flex items-center gap-2 text-sm text-[#0F2C5A]"><CheckCircle size={16} strokeWidth={1.5} className="text-[#166534]" />{item.action}</p><p className="text-xs text-[#64748B]">{item.detail}</p></div>)}</div>
          </>
        ) : <p className="text-sm text-[#64748B]">Submit the form to view your risk score and suggestions.</p>}
      </div>
    </main>
  );
}
