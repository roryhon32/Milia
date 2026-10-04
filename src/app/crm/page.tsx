import type { Metadata } from "next";
import { CrmApp } from "@/components/crm/CrmApp";
export const metadata: Metadata = {
  title: "Área comercial",
  robots: { index: false, follow: false },
  alternates: { canonical: "/crm" },
};
export default function Page() {
  return <CrmApp />;
}
