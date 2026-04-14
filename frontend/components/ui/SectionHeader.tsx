type SectionHeaderProps = {
  title: string;
  subtitle?: string;
};

export default function SectionHeader({ title, subtitle }: SectionHeaderProps) {
  return (
    <div className="mb-6">
      <h1 className="text-2xl font-semibold text-[#0F2C5A]">{title}</h1>
      {subtitle ? <p className="mt-1 text-sm text-[#64748B]">{subtitle}</p> : null}
    </div>
  );
}
