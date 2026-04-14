import { ReactNode } from "react";

type ScoreCardProps = {
  title: string;
  value: ReactNode;
  helper?: string;
  progress?: number;
};

export default function ScoreCard({ title, value, helper, progress = 0 }: ScoreCardProps) {
  return (
    <div className="rounded-md border border-[#E2E8F0] bg-white p-4 shadow-sm">
      <p className="text-xs text-[#64748B]">{title}</p>
      <div className="mt-2 text-2xl font-semibold text-[#0F2C5A]">{value}</div>
      {helper ? <p className="mt-1 text-xs text-[#64748B]">{helper}</p> : null}
      <div className="mt-3 h-1 w-full rounded bg-[#E2E8F0]">
        <div className="h-1 rounded bg-[#0F2C5A]" style={{ width: `${Math.min(progress, 100)}%` }} />
      </div>
    </div>
  );
}
