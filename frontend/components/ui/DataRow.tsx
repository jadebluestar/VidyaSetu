import { ReactNode } from "react";

type DataRowProps = {
  label: string;
  value: ReactNode;
  className?: string;
};

export default function DataRow({ label, value, className = "" }: DataRowProps) {
  return (
    <div className={`flex items-center justify-between border-b border-[#E2E8F0] py-2 ${className}`}>
      <span className="text-sm text-[#64748B]">{label}</span>
      <span className="text-sm font-medium text-[#0F2C5A]">{value}</span>
    </div>
  );
}
