import { ReactNode } from "react";

type PageWrapperProps = {
  children: ReactNode;
  className?: string;
};

export default function PageWrapper({ children, className = "" }: PageWrapperProps) {
  return <main className={`mx-auto w-full ${className}`}>{children}</main>;
}
