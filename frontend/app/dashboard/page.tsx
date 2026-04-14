import { CreditCard, Flame, ShieldCheck, TrendingUp } from "lucide-react";
import Link from "next/link";
import ScoreCard from "@/components/ui/ScoreCard";
import DataRow from "@/components/ui/DataRow";
import StatusBadge from "@/components/ui/StatusBadge";

export default function DashboardPage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-8">
      <div className="mb-6 flex items-start justify-between">
        <div>
          <h1 className="text-xl font-semibold text-[#0F2C5A]">Good morning, Arjun</h1>
          <p className="text-sm text-[#64748B]">MS Computer Science → USA</p>
        </div>
        <div className="flex items-center gap-2 rounded-md border border-[#E2E8F0] bg-white px-4 py-2 shadow-sm">
          <Flame size={16} strokeWidth={1.5} className="text-[#D97706]" />
          <div>
            <p className="text-2xl font-semibold text-[#0F2C5A] leading-6">12</p>
            <p className="text-xs text-[#64748B]">day streak</p>
          </div>
        </div>
      </div>

      <div className="mb-6 grid grid-cols-4 gap-4">
        <ScoreCard title="Loan Readiness" value={<><span>74</span><span className="text-sm text-[#64748B]">/100</span></>} progress={74} />
        <ScoreCard title="XP" value="840" helper="Scholar level" progress={68} />
        <ScoreCard title="Profile" value="80%" helper="2 steps left" progress={80} />
        <ScoreCard title="Deadline" value="47" helper="days to Dec 1 deadline" progress={35} />
      </div>

      <div className="mb-6 grid grid-cols-3 gap-4">
        {[
          [TrendingUp, "Future Self Simulator", "Explore your salary, city, and loan outcomes by age.", "Run Simulation", "/future-self"],
          [ShieldCheck, "Visa Risk Score", "Identify rejection risks and improve your application odds.", "Check My Risk", "/visa-risk"],
          [CreditCard, "Loan Offers", "Compare lenders, EMI impact, and best-fit options.", "View Offers", "/loan-offers"]
        ].map(([Icon, title, desc, button, href]) => (
          <div key={title as string} className="rounded-md border border-[#E2E8F0] bg-white p-5 shadow-sm">
            <Icon size={16} strokeWidth={1.5} className="text-[#64748B]" />
            <h2 className="mt-3 text-sm font-semibold text-[#0F2C5A]">{title as string}</h2>
            <p className="mt-1 text-xs text-[#64748B]">{desc as string}</p>
            <Link
              href={href as string}
              className="mt-4 inline-flex h-8 items-center rounded-md bg-[#0F2C5A] px-4 text-xs font-medium text-white hover:bg-[#1A3F7A]"
            >
              {button as string}
            </Link>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="col-span-2 rounded-md border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F2C5A]">Students like you</h3>
          <div className="mt-2">
            <DataRow label="City" value="Pune" />
            <DataRow label="Target" value="MS CS, USA" />
            <DataRow label="Typical loan" value="₹28L – ₹42L" />
            <DataRow label="Avg EMI" value="₹24,500/month" />
            <DataRow label="Placement rate" value="94% within 6 months" className="border-b-0" />
          </div>
        </div>
        <div className="rounded-md border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <h3 className="text-sm font-semibold text-[#0F2C5A]">Upcoming Deadlines</h3>
          <div className="mt-3 space-y-3">
            {[
              ["Northeastern University", "18/04/2026", "Urgent", "red"],
              ["ASU", "25/04/2026", "Soon", "amber"],
              ["University of Michigan", "01/05/2026", "Soon", "amber"],
              ["UT Dallas", "15/05/2026", "Open", "green"]
            ].map(([name, date, status, tone]) => (
              <div key={name as string} className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#0F2C5A]">{name as string}</p>
                  <p className="text-xs text-[#64748B]">{date as string}</p>
                </div>
                <StatusBadge tone={tone as "red" | "amber" | "green"}>{status as string}</StatusBadge>
              </div>
            ))}
          </div>
          <button className="mt-4 text-xs text-[#0F2C5A]">+ Add deadline</button>
        </div>
      </div>
    </main>
  );
}
