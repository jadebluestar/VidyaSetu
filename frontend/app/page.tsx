import Link from "next/link";
import PageWrapper from "@/components/layout/PageWrapper";

export default function Home() {
  return (
    <PageWrapper className="max-w-5xl px-6 py-10">
      <div className="rounded-md border border-[#E2E8F0] bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold text-[#0F2C5A]">VidyaSetu</h1>
        <p className="mt-2 text-sm text-[#64748B]">
          VidyaSetu
        </p>
        <div className="mt-6 flex gap-4">
          <Link
            href="/demo"
            className="h-10 rounded-md bg-[#0F2C5A] px-6 text-sm font-medium leading-10 text-white hover:bg-[#1A3F7A]"
          >
            Load Profile
          </Link>
          <Link
            href="/onboarding"
            className="h-10 rounded-md border border-[#E2E8F0] bg-white px-6 text-sm font-medium leading-10 text-[#0F2C5A]"
          >
            Start Onboarding
          </Link>
        </div>
      </div>
    </PageWrapper>
  );
}
