"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import StepIndicator from "@/components/ui/StepIndicator";
import { DEMO_PROFILE, indianMoney } from "@/lib/profile";

const colleges = [
  "IIT Bombay",
  "IIT Delhi",
  "IIT Madras",
  "IIT Kanpur",
  "IIT Kharagpur",
  "IIT Roorkee",
  "NIT Trichy",
  "NIT Surathkal",
  "NIT Warangal",
  "BITS Pilani",
  "BITS Goa",
  "VIT Vellore",
  "Manipal Institute of Technology",
  "Delhi Technological University",
  "NSUT",
  "Anna University",
  "Jadavpur University",
  "PES University",
  "SRM Institute of Science and Technology",
  "COEP Technological University"
];

export default function OnboardingPage() {
  const [step, setStep] = useState(1);
  const [showXp, setShowXp] = useState(false);
  const [error, setError] = useState("");
  const [form, setForm] = useState({
    ...DEMO_PROFILE,
    gmat: 0,
    toefl: 0,
    work_experience: "Fresher",
    not_taken_gre: false,
    not_taken_gmat: true,
    not_taken_ielts: false,
    not_taken_toefl: true,
    collateral_value: ""
  });
  const router = useRouter();

  const helperBudget = useMemo(() => `≈ ₹${indianMoney(form.budget_lakhs)}`, [form.budget_lakhs]);

  const nextStep = () => {
    if (step === 1 && !/^\d{10}$/.test(form.phone)) {
      setError("Please enter a valid 10-digit phone number.");
      return;
    }
    setError("");
    if (step < 5) {
      setStep((prev) => prev + 1);
      setShowXp(true);
      setTimeout(() => setShowXp(false), 800);
      return;
    }
    localStorage.setItem("fined-navigator-profile", JSON.stringify(form));
    router.push("/dashboard");
  };

  return (
    <main className="mx-auto max-w-xl px-6 py-10">
      <StepIndicator activeStep={step} />
      <h1 className="mt-6 text-lg font-semibold text-[#0F2C5A]">{["Basic Info", "Education", "Target", "Test Scores", "Financial"][step - 1]}</h1>
      <p className="mb-6 text-sm text-[#64748B]">Complete your profile to unlock personalised study-abroad guidance.</p>
      {error ? <p className="mb-4 text-sm text-[#B91C1C]">{error}</p> : null}

      <div className="relative rounded-md border border-[#E2E8F0] bg-white p-6 shadow-sm">
        {showXp ? (
          <div className="absolute right-6 top-4 text-xs font-medium text-[#16A34A] opacity-100 transition-opacity duration-500">+40 XP</div>
        ) : null}

        {step === 1 ? (
          <div className="space-y-4">
            <input className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" placeholder="Full Name" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <input className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" placeholder="e.g. Pune, Mumbai, Hyderabad" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
            <div className="flex h-10 items-center rounded-md border border-[#E2E8F0] bg-white px-3">
              <span className="mr-2 text-sm text-[#64748B]">+91</span>
              <input className="w-full text-sm focus:outline-none" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value.replace(/\D/g, "").slice(0, 10) })} />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <input type="number" min={0} max={100} className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" placeholder="10th Score (%)" value={form.score_10th} onChange={(e) => setForm({ ...form, score_10th: Number(e.target.value) })} />
              <input type="number" min={0} max={100} className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" placeholder="12th Score (%)" value={form.score_12th} onChange={(e) => setForm({ ...form, score_12th: Number(e.target.value) })} />
            </div>
          </div>
        ) : null}

        {step === 2 ? (
          <div className="space-y-4">
            <input list="colleges" className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form.college} onChange={(e) => setForm({ ...form, college: e.target.value })} />
            <datalist id="colleges">{colleges.map((c) => <option value={c} key={c} />)}</datalist>
            <div className="relative">
              <input type="number" min={0} max={10} step={0.1} className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form.cgpa} onChange={(e) => setForm({ ...form, cgpa: Number(e.target.value) })} />
              <span className="absolute right-3 top-2.5 text-sm text-[#64748B]">/10</span>
            </div>
            <select className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form.grad_year} onChange={(e) => setForm({ ...form, grad_year: Number(e.target.value) })}>
              {Array.from({ length: 9 }, (_, idx) => 2020 + idx).map((year) => <option key={year}>{year}</option>)}
            </select>
          </div>
        ) : null}

        {step === 3 ? (
          <div className="space-y-4">
            <select className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })}>
              {["USA", "UK", "Canada", "Australia", "Germany", "Singapore", "Ireland"].map((v) => <option key={v}>{v}</option>)}
            </select>
            <select className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form.course} onChange={(e) => setForm({ ...form, course: e.target.value })}>
              {["MS (Tech)", "MBA", "MS (Non-Tech)", "MIM", "MPH", "MFA", "LLM"].map((v) => <option key={v}>{v}</option>)}
            </select>
            <div>
              <label className="mb-2 block text-sm text-[#64748B]">Budget (₹L): ₹{form.budget_lakhs}L</label>
              <input type="range" min={10} max={80} step={5} value={form.budget_lakhs} onChange={(e) => setForm({ ...form, budget_lakhs: Number(e.target.value) })} className="w-full" />
              <p className="mt-1 text-xs text-[#64748B]">{helperBudget}</p>
            </div>
          </div>
        ) : null}

        {step === 4 ? (
          <div className="grid grid-cols-2 gap-4">
            {["gre", "gmat", "ielts", "toefl"].map((key) => {
              const notTaken = `not_taken_${key}` as keyof typeof form;
              return (
                <div key={key} className="space-y-2">
                  <input disabled={Boolean(form[notTaken])} type="number" className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A] disabled:bg-[#F5F7FA]" placeholder={key.toUpperCase()} value={Number(form[key as keyof typeof form]) || ""} onChange={(e) => setForm({ ...form, [key]: Number(e.target.value) })} />
                  <label className="flex items-center gap-2 text-xs text-[#64748B]"><input type="checkbox" checked={Boolean(form[notTaken])} onChange={(e) => setForm({ ...form, [notTaken]: e.target.checked })} />Not taken yet</label>
                </div>
              );
            })}
          </div>
        ) : null}

        {step === 5 ? (
          <div className="space-y-4">
            <select className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form.family_income} onChange={(e) => setForm({ ...form, family_income: e.target.value })}>
              {["Below ₹3L", "₹3L-₹6L", "₹6L-₹10L", "₹10L-₹20L", "Above ₹20L"].map((v) => <option key={v}>{v}</option>)}
            </select>
            <div className="flex gap-4 text-sm">
              <label><input type="radio" checked={form.co_applicant} onChange={() => setForm({ ...form, co_applicant: true })} /> Yes</label>
              <label><input type="radio" checked={!form.co_applicant} onChange={() => setForm({ ...form, co_applicant: false })} /> No</label>
            </div>
            <div className="flex gap-4 text-sm">
              <label><input type="radio" checked={form.collateral} onChange={() => setForm({ ...form, collateral: true })} /> Yes</label>
              <label><input type="radio" checked={!form.collateral} onChange={() => setForm({ ...form, collateral: false })} /> No</label>
            </div>
            {form.collateral ? (
              <input className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" placeholder="Estimated value ₹L" value={form.collateral_value} onChange={(e) => setForm({ ...form, collateral_value: e.target.value })} />
            ) : null}
            <select className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form.work_experience} onChange={(e) => setForm({ ...form, work_experience: e.target.value })}>
              {["Fresher", "< 1 year", "1-2 years", "2+ years"].map((v) => <option key={v}>{v}</option>)}
            </select>
          </div>
        ) : null}

        <div className="mt-6 grid grid-cols-3 items-center">
          <button type="button" onClick={() => setStep((p) => Math.max(1, p - 1))} className="justify-self-start text-sm text-[#0F2C5A]">Back</button>
          <span className="justify-self-center text-sm text-[#64748B]">Step {step} of 5</span>
          <button type="button" onClick={nextStep} className="h-10 justify-self-end rounded-md bg-[#0F2C5A] px-6 text-sm font-medium text-white hover:bg-[#1A3F7A]">{step === 5 ? "Finish" : "Next"}</button>
        </div>
      </div>
    </main>
  );
}
