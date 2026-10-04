import type { Metadata } from "next";
import { CrmApp } from "@/components/crm/CrmApp";
export const metadata: Metadata = {
  title: "Fila comercial",
  robots: { index: false, follow: false },
  alternates: { canonical: "/outreach" },
};
export default function Page() {
  return <CrmApp outreach />;
}
