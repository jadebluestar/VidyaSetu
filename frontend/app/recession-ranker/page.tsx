"use client";

import { ChevronDown } from "lucide-react";
import { useMemo, useState } from "react";
import StatusBadge from "@/components/ui/StatusBadge";

const data = [
  { rank: 1, score: 92, name: "Data Science", category: "Tech", salary: "₹12-34 LPA" },
  { rank: 2, score: 88, name: "Healthcare Informatics", category: "Healthcare", salary: "₹10-26 LPA" },
  { rank: 3, score: 84, name: "Business Analytics", category: "Business", salary: "₹9-28 LPA" }
];

export default function RecessionRankerPage() {
  const [query, setQuery] = useState("");
  const [filter, setFilter] = useState("All");
  const [open, setOpen] = useState<number | null>(1);

  const list = useMemo(() => data.filter((i) => (filter === "All" || i.category === filter) && i.name.toLowerCase().includes(query.toLowerCase())), [query, filter]);

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <input className="h-10 w-full rounded-md border border-[#E2E8F0] bg-white px-3 text-sm" placeholder="Search courses" value={query} onChange={(e) => setQuery(e.target.value)} />
      <div className="my-4 flex gap-2">{["All", "Tech", "Healthcare", "Business", "Engineering", "Law"].map((item) => <button key={item} onClick={() => setFilter(item)} className={`h-8 rounded-md border border-[#E2E8F0] px-4 text-xs ${filter === item ? "bg-[#0F2C5A] text-white" : "bg-white text-[#0F2C5A]"}`}>{item}</button>)}</div>
      <div className="space-y-3">{list.map((item) => (
        <div key={item.rank} className="rounded-md border border-[#E2E8F0] bg-white p-4 shadow-sm">
          <div className="flex items-center gap-4">
            <p className="w-6 text-sm font-semibold text-[#64748B]">{item.rank}</p>
            <p className="w-12 text-xl font-semibold text-[#0F2C5A]">{item.score}<span className="text-xs text-[#64748B]">/100</span></p>
            <div className="h-10 w-px bg-[#E2E8F0]" />
            <div className="flex-1">
              <div className="flex items-center gap-2"><p className="text-sm font-semibold text-[#0F2C5A]">{item.name}</p><StatusBadge tone="amber">{item.category}</StatusBadge></div>
              <p className="text-xs text-[#64748B]">{item.salary}</p>
            </div>
            <button onClick={() => setOpen(open === item.rank ? null : item.rank)}><ChevronDown size={16} strokeWidth={1.5} className="text-[#64748B]" /></button>
          </div>
          {open === item.rank ? <div className="mt-4 rounded-md bg-[#F5F7FA] p-3 text-xs text-[#64748B]"><div className="space-y-2">{[78, 70, 83, 75, 90].map((bar, idx) => <div key={idx}><div className="mb-1 h-1 w-full rounded bg-[#E2E8F0]"><div className="h-1 rounded bg-[#0F2C5A]" style={{ width: `${bar}%` }} /></div></div>)}</div><p className="mt-3">India insight: hiring is strongest in Bengaluru, Hyderabad, and Pune for this track.</p></div> : null}
        </div>
      ))}</div>
    </main>
  );
}
