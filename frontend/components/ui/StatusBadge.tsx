import { ReactNode } from "react";

type StatusTone = "green" | "red" | "amber";

type StatusBadgeProps = {
  children: ReactNode;
  tone?: StatusTone;
};

const toneClasses: Record<StatusTone, string> = {
  green: "bg-[#DCFCE7] text-[#166534]",
  red: "bg-[#FEE2E2] text-[#991B1B]",
  amber: "bg-[#FEF3C7] text-[#92400E]"
};

export default function StatusBadge({ children, tone = "amber" }: StatusBadgeProps) {
  return <span className={`rounded px-2 py-0.5 text-xs font-medium ${toneClasses[tone]}`}>{children}</span>;
}
