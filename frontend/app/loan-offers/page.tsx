"use client";

import { useMemo, useState } from "react";
import SectionHeader from "@/components/ui/SectionHeader";
import StatusBadge from "@/components/ui/StatusBadge";
import DataRow from "@/components/ui/DataRow";

const lenders = [
  { name: "SBI Scholar Loan", rate: 9.55, max: "₹150L", fee: "₹0", best: true },
  { name: "HDFC Credila", rate: 11.25, max: "₹75L", fee: "1%", best: false },
  { name: "Avanse", rate: 12.5, max: "₹60L", fee: "₹15,000", best: false },
  { name: "Auxilo", rate: 13, max: "₹50L", fee: "1.5%", best: false },
  { name: "InCred", rate: 12.75, max: "₹40L", fee: "₹12,500", best: false }
];

export default function LoanOffersPage() {
  const [amountL, setAmountL] = useState(40);
  const [tenure, setTenure] = useState(10);

  const values = useMemo(() => {
    const principal = amountL * 100000;
    const annualRate = 10.5;
    const r = annualRate / 12 / 100;
    const n = tenure * 12;
    const emi = (principal * r * (1 + r) ** n) / ((1 + r) ** n - 1);
    const total = emi * n;
    const interest = total - principal;
    return {
      emi: new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0 }).format(emi),
      totalL: (total / 100000).toFixed(1),
      interestL: (interest / 100000).toFixed(1)
    };
  }, [amountL, tenure]);

  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <SectionHeader title="Loan Offers" subtitle="Compare lenders matched to your profile and budget." />
      <p className="mb-6 text-xs text-[#64748B]">Profile fit: CGPA 8.2 · GRE 320 · Family Income ₹6L-₹10L · Co-applicant available</p>

      <div className="space-y-3">
        {lenders.map((lender) => (
          <div key={lender.name} className={`rounded-md border border-[#E2E8F0] bg-white p-5 shadow-sm ${lender.best ? "border-l-2 border-l-[#0F2C5A]" : ""}`}>
            <div className="grid grid-cols-5 items-center gap-4">
              <div>
                <p className="text-sm font-semibold text-[#0F2C5A]">{lender.name}</p>
                <p className="text-xs text-[#64748B]">Education Loan</p>
                {lender.best ? <div className="mt-2"><StatusBadge tone="green">Best Match</StatusBadge></div> : null}
              </div>
              <div><p className="text-xs text-[#64748B]">Interest Rate</p><p className="text-sm font-semibold text-[#0F2C5A]">{lender.rate}% p.a.</p></div>
              <div><p className="text-xs text-[#64748B]">Max Amount</p><p className="text-sm font-semibold text-[#0F2C5A]">{lender.max}</p></div>
              <div><p className="text-xs text-[#64748B]">Processing Fee</p><p className="text-sm font-medium text-[#0F2C5A]">{lender.fee}</p></div>
              <button className="h-8 rounded-md bg-[#0F2C5A] px-4 text-xs font-medium text-white hover:bg-[#1A3F7A]">Apply Now</button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-md border border-[#E2E8F0] bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold text-[#0F2C5A]">EMI Calculator</h3>
        <div className="mt-4 grid grid-cols-2 gap-6">
          <div><p className="text-xs text-[#64748B]">Loan Amount: ₹{amountL}L</p><input type="range" min={5} max={80} step={1} value={amountL} onChange={(e) => setAmountL(Number(e.target.value))} className="w-full" /></div>
          <div><p className="text-xs text-[#64748B]">Tenure: {tenure} years</p><input type="range" min={5} max={15} step={1} value={tenure} onChange={(e) => setTenure(Number(e.target.value))} className="w-full" /></div>
        </div>
        <div className="mt-4">
          <DataRow label="Monthly EMI" value={`₹${values.emi}`} />
          <DataRow label="Total Interest" value={`₹${values.interestL}L`} />
          <DataRow label="Total Amount" value={`₹${values.totalL}L`} className="border-b-0" />
        </div>
      </div>
    </main>
  );
}
