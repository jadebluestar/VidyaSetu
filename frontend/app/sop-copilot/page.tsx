"use client";

import { useMemo, useState } from "react";

export default function SopCopilotPage() {
  const [form, setForm] = useState({ why_course: "", why_country: "", career_goal: "", achievement: "", financial_plan: "", course: "MS CS", word_count: 500 });
  const [output, setOutput] = useState("");
  const [refine, setRefine] = useState("");
  const [xp, setXp] = useState(false);

  const words = useMemo(() => output.trim().split(/\s+/).filter(Boolean).length, [output]);

  const generate = async () => {
    setOutput("");
    const response = await fetch("/api/sop", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify(form) });
    if (!response.body) return;
    const reader = response.body.getReader();
    const decoder = new TextDecoder();
    let done = false;
    while (!done) {
      const chunk = await reader.read();
      done = chunk.done;
      if (chunk.value) {
        const text = decoder.decode(chunk.value, { stream: true });
        const lines = text.split("\n").filter((line) => line.startsWith("data: "));
        for (const line of lines) {
          const payload = line.replace("data: ", "").trim();
          if (payload === "[DONE]") continue;
          try {
            const parsed = JSON.parse(payload);
            setOutput((prev) => prev + parsed.text);
          } catch {
            continue;
          }
        }
      }
    }
    setXp(true);
  };

  return (
    <main className="mx-auto max-w-4xl px-6 py-8">
      <div className="grid grid-cols-5 gap-6">
        <div className="col-span-2 rounded-md border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <div className="space-y-4">
            {[
              ["why_course", "Why this course?", 3],
              ["why_country", "Why this country?", 3],
              ["career_goal", "Career goal in 5 years?", 2],
              ["achievement", "Unique achievement", 2],
              ["financial_plan", "Financial plan", 2]
            ].map(([key, label, rows]) => (
              <div key={key as string}>
                <label className="mb-1 block text-xs font-medium uppercase tracking-wide text-[#64748B]">{label as string}</label>
                <textarea rows={rows as number} className="w-full rounded-md border border-[#E2E8F0] bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#0F2C5A]" value={form[key as keyof typeof form] as string} onChange={(e) => setForm({ ...form, [key]: e.target.value })} />
              </div>
            ))}
            <select className="h-10 w-full rounded-md border border-[#E2E8F0] px-3 text-sm" value={form.word_count} onChange={(e) => setForm({ ...form, word_count: Number(e.target.value) })}>
              <option value={500}>500 words</option>
              <option value={1000}>1000 words</option>
            </select>
            <button onClick={generate} className="h-10 w-full rounded-md bg-[#0F2C5A] px-6 text-sm font-medium text-white hover:bg-[#1A3F7A]">Generate SOP</button>
          </div>
        </div>

        <div className="col-span-3 rounded-md border border-[#E2E8F0] bg-white p-5 shadow-sm">
          <div className="mb-3 text-right text-xs text-[#64748B]">{words} / {form.word_count} words</div>
          <textarea className="h-80 w-full resize-none rounded-md border border-[#E2E8F0] p-3 text-sm leading-7 text-[#0F2C5A] focus:outline-none" value={output} onChange={(e) => setOutput(e.target.value)} />
          <div className="mt-4 flex gap-3">
            <button className="h-10 rounded-md border border-[#E2E8F0] bg-white px-6 text-sm text-[#0F2C5A]">Refine</button>
            <input className="h-10 flex-1 rounded-md border border-[#E2E8F0] bg-white px-3 text-sm" placeholder="Add refinement instruction" value={refine} onChange={(e) => setRefine(e.target.value)} />
          </div>
          {xp ? <p className="mt-3 text-xs font-medium text-[#16A34A]">+50 XP earned</p> : null}
        </div>
      </div>
    </main>
  );
}
